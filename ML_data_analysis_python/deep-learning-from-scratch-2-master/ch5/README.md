## 신경망 종류
### 피드포워드(feed forward)
- 흐름이 `단방향`인 신경망
	- 입력신호가 다음층으로 전달되고 또 다음층으로 전달되고... 이런식으로 한방향으로 신호가 전달됨
- `시계열 데이터(time series data`를 잘 다루지 못한다.
	- 시계열 데이터의 성질(패턴)을 충분히 학습할 수 없다.

### 순환신경망(RNN)
- `시계열 데이터` 학습 가능

***

## 확률과 언어 모델
### 확률
- word2vec(CBOW, skip-gram 등)의 원래 목적은 context로부터 target을 정확히 추측하는 것!
- 근데 이 목적을 위해 학습을 진행하면 부산물로 단어의 의미가 인코딩된 `단어의 분산 표현`을 얻을 수 있음
- 그럼 본래 목적인 _'맥락으로부터 타깃을 추측하는 것'_ 은 어디에 이용할까? 
	- __P(w2 | w1, w3)은 실용적인 쓰임이 있을까? => `언어 모델` 등장__

### 언어 모델(Language Model)
1. 단어 나열에 확률을 부여함
	- 특정한 `시퀀스`에 대해서, 그 시퀀스가 일어날 가능성이 어느 정도인지(얼마나 자연스러운 단어 순서인지)를 확률로 평가함
2. 새로운 문장을 생성하는 용도
	- 언어 모델은 단어 순서의 자연스러움을 확률적으로 평가할 수 있으므로, 그 확률 분포에 따라 다음으로 적합한 단어를 `샘플링`할 수 있음
	- [7장. RNN을 사용한 문장 생성](https://github.com/HYEZ/deep-learning-from-scratch-2/tree/master/ch7)

#### 언어 모델을 수식으로 표현하기
- 동시 확률: 여러 사건이 동시에 일어나는 확률 => `곱셈정리`에 의해 `사후 확률의 총곱`으로 표현 가능
- 확률의 곱셈정리: P(A, B) = P(A|B)P(B)
	- A, B가 모두 일어날 확률은 B가 일어난 확률과 B가 일어난 후 A가 일어날 확률을 곱한 값과 같다.
	- A, B 중 어느 것을 _사후 확률의 조건_ 으로 할 건지에 대해 __2가지 방법이 존재__
- 단어가 w1, ..., wm 순서로 출현할 확률은 동시에 발생할 확률이므로 `동시 확률`으로 표현이 가능함
	- P(w1, w2, w3, ..., wm) = P(wm|w1,...,wm-1)P(wm-1|w1,...,wm-2)...P(w3|w1,w2)P(w2|w1)P(w1)
	- 단, 이 사후 확률은 타깃 단어보다 왼쪽에 있는 모든 단어를 맥락(조건)으로 했을 때의 확률이다!
	- 참고)
		- P(w1, ...,wt, ..., wm) = P(wm|w1,...,wm-1)P(wm-1|w1,...,wm-2)...P(w3|w1,w2)P(w2|w1)P(w1)
		- P(wt|w1, ..., wt-1)을 나타내는 모델은 `조건부 언어 모델(Conditional Language Model)`이라고 함
			- 이 확률을 계산할 수 있으면 우리는 언어모델의 동시 확률인 P(w1, ..., wm)를 구할 수 있음

#### CBOW 모델을 언어 모델로?
- word2vec의 CBOW 모델을 (억지로) 언어 모델에 적용
	- 맥락의 크기를 특정 값으로 한정하여 근사적으로 나타낸다.
- `마르코브 연쇄(Markov Chain)` or `마르코브 모델(Markov Model)`
	- 미래 상태가 현재 상태에만 의존해 결정되는 것
	- 이 사상의 확률이 그 직전 N개에만 의존할 때 `N층 마르코브 연쇄`라고 한다.
	- ex) 직전 2개의 단어에만 의존해서 다음 단어가 정해지는 모델 = 2층 마르코브 연쇄
- CBOW 모델 문제점
	- 맥락 수가 고정되어 있음 => 맥락이 아닌 부분은 기억 X
	- __맥락 안의 단어 순서는 무시됨__ (bag-of-words: 순서 대신 분포를 사용함)
	- => `신경 확률론적 언어 모델`: 단어 순서를 고려하기 위해 맥락의 단어 벡터를 은닉충에서 연결하자!
		- B/ 맥락의 크기에 비례해 가중치 매개변수도 늘어남
	- => `RNN`으로 해결
		- RNN은 맥락이 아무리 길더라도 그 맥락의 정보를 기억함

### 참고
- word2vec은 단어의 분산 표현을 얻기 위한 것, 이를 언어 모델로 사용하는 경우는 잘 없음
- 이 책에선 word2vec의 CBOW모델을 억지로 언어모델에 적용함

***

## RNN(Recurrent Neural Network)
- `재귀` 또는 `순환` 신경망
	- 반복해서 되돌아간다. (단, `순환하는 경로(닫힌 경로)`가 필요하다)
- 데이터가 순환되기 때문에 과거의 정보를 기억하는 동시에 최신 데이터로 갱신될 수 있음
- RNN은 `순환 경로`를 포함시켜서 데이터를 계층 안에서 순환시킬 수 있음
- `시계열 데이터`
	- 시간 방향으로 데이터가 나열됨
	- `시각`: 시계열 데이터의 인덱스 
		- 시각 t의 입력 데이터 Xt
		- t번째 단어 = 시각 t의 단어
		- t번째 RNN 계층 = 시각 t의 RNN 계층
- RNN 계층에서 수행하는 계산
	- `tanh`를 이용해 변환
		- tanh 함수는 `활성화 함수 `로 사용한다.
		- tanh 함수는 시그모이드 함수를 transformation해서 얻을 수 있다.
		- tanh 함수는 함수의 중심값을 0으로 옮겨 sigmoid의 최적화 과정이 느려지는 문제를 해결했다.
		- 하지만 미분함수에 대해 일정값 이상 커질시 미분값이 소실되는 gradient vanishing 문제는 여전히 남아있다.
	- 가중치는 2개가 있음(x->h 변환을 위한 가중치, 다음 시각의 출력으로 변환을 위한 가중치)
	- ht는 한 시각 이전 출력인 ht-1에 기초에 계산됨
	- ht는 다른 계층을 향해 위쪽으로 출력됨과 동시에, 다음 시각의 RNN계층을 향해 오른쪽으로도 출력 __(같은 값이 동시에 분기)__
	- 결국, RNN은 h라는 `상태`를 가지고 있고 식에 의해 갱신되는 것
	- 따라서 RNN 계층을 `상태를 가지는 계층` 혹은 `메모리가 있는 계층`이라고 함
	- RNN의 출력 ht는 `은닉 상태` 또는 `은닉 상태 벡터`라고 함

## BPTT(Backpropagation Through Time)
- 시간 방향으로 펼친 신경망의 오차역전파법
- RNN도 일반적인 오차역전파법 적용
	- 먼저 순전파를 수행, 역전파로 원하는 기울기 구하기 가능임
- BPTT 이용해 RNN 학습
- __단, 긴 시계열 데이터 학습할 때 문제 발생__
	- 시계열 데이터의 시간 크기가 커지면 BPTT가 소비하는 컴퓨팅 자원이 증가
	- 시간의 크기가 커지면 역전파 시 기울기가 불안정해짐
		- 계층이 길어짐에 따라 신경망을 하나 통과할 때마다 __기울기 값이 조금씩 작아짐__ => 이전 시각 t까지 역전파되기 전에 0이 되어 소멸할 수도 있음..
		- BPTT를 이용해 기울기 구하려면 매 시각 RNN 계층의 중간 데이터를 메모리에 유지해야 함 => 메모리 사용량도 증가

### Truncated BPTT
- 큰 시계열 데이터 취급할 때 신경망 연결을 적당한 길이로 끊음 => 작은 신경망을 여러 개로 만듬
- 그리고 이 잘라낸 작은 신경망에서 오차역전파법(backpropagation) 수행
- 단, `역전파`의 연결만 끊어야 한다!!! 
	- 각각의 `블록 단위`로 (미래의 블록과는 독립적으로) 오차역전파법을 수행한다.
- `순전파`의 연결은 유지한다!!!
	- 데이터를 _순서대로_ 입력해야 함!
	- 미니배치 학습 시 데이터를 무작위로 선택X, 순서대로 입력해야 함
	- 순전파는 블록이 끊겨도 계속 연결됨
- 미니배치 학습
	- 데이터를 순서대로 입력해야 함
		- 그렇게 하려면 데이터를 주는 시작 위치를 각 미니배치의 시작 위치로 옮겨야 함
		- ex) 미니배치 수가 2개, 데이터가 1000개, 블록이 10개인 경우 Truncated BPTT
			- 첫 번째 미니배치 : 0 데이터를 시작 위치로 정함 (x0-x9)
			- 두 번째 미니배치 : 500번째 데이터를 시작 위치로 정함 (x500-x509)
			- 미니배치 첨에 이렇게 입력하고 이 미니배치 데이터를 RNN에 입력해 학습 수행
			- 데이터를 순서대로 입력하다가 끝에 도달하면 다시 처음부터 입력하도록 한다. (각 미니배치별 시작 위치 오프셋으로 변경)
			- 이후에는 순서대로 진행되므로 다음에 넘길 데이터는 (x10-x19, x510-x519) 데이터가 됨
- __Truncated BPTT 할 때 데이터 제공 방법에서 주의하자!__
	1. 데이터를 순서대로 제공하기
	2. 미니배치별로 데이터를 제공하는 시작 위치를 옮기기

***

## RNNLM(RNN Language Model)
- `RNN`을 사용한 언어 모델
1. Embedding 계층 : 단어 ID를 분산 표현으로 변환
2. RNN 계층
3. Affine 계층
4. Softmax 계층

## 언어 모델의 평가 방법
- 평가의 척도로 `perplexity(혼란도)` 사용
	- 확률의 역수, 최소값은 1
	- 작을수록 좋음
	- `분기 수(number of branches)`로 해석할 수 있음
		- 다음에 출현할 수 있는 단어의 후보 수
		- ex) perplexity가 1.25 => 다음에 출현할 단어의 후보는 1개임 / 5 => 다음에 출현할 단어의 후보는 5개
	- perplexity = exp(L)

## RNNLM 학습 절차
1. 미니배치를 `순차적`으로 만들어
2. 모델의 순전파와 역전파를 호출하고
3. 옵티마이저로 가중치를 갱신하고
4. 퍼플렉서티 구함 

