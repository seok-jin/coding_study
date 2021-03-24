import requests
import json
from pykrx import stock
from datetime import date, datetime, timedelta
import pandas as pd
def post_message(channel, text): 
    SLACK_BOT_TOKEN = ""
    headers = {
        'Content-Type': 'application/json', 
        'Authorization': 'Bearer ' + SLACK_BOT_TOKEN
        }
    payload = {
        'channel': channel,
        'text': text
        }
    r = requests.post('https://slack.com/api/chat.postMessage', 
        headers=headers, 
        data=json.dumps(payload)
        )
to_day = date.today().isoformat().replace('-', '')
df = stock.get_market_ohlcv_by_date("20210320",to_day, "252670", "d")
df = pd.DataFrame(df)
text  = df.iloc[-1][3]
text2 = int(text)*9466 - 21239545
a = int(df.iloc[-1][3])
b = int(df.iloc[-2][3])
c = round((a - b) / a * 100,2)
post_message("financefroject", '현제가 :'+format(text, ',')+'원 ('+format(c, ',')+'%)'+ '\n보유수량 :9,466주'+'\n손익 :'+format(text2, ',')+'원')