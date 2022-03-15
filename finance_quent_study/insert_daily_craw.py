from datetime import date, datetime, timedelta
import pandas as pd
import pymysql
import numpy as np
from pykrx import stock
from time import sleep

def change_df_to_array(df, ticker_code, stock_lsits):
    ticker_code_num = 0
    if stock_lsits == 'KOSPI':
        ticker_code_num = 1
    elif stock_lsits == 'KOSDAQ':
        ticker_code_num = 2
    elif stock_lsits == 'ETF':
        ticker_code_num = 3

    gbn_code = 0
    if ticker_code_num == 3:
        gbn_code = 1


    a = np.array([ticker_code_num, ticker_code]* len(df))
    a = np.array(a).reshape(len(df),-1)
    df['date'] = df.index.strftime('%Y-%m-%d')
    # 일자, 종가4, 시가1, 고가2, 저가3, 거래량5
    c =  np.array(df.values.tolist())[:,[-1,0+gbn_code,1+gbn_code,2+gbn_code,3+gbn_code,4+gbn_code]]
    a = np.append(a,c , axis = 1)

    return a


def insert_daily_craw(df, connection):

    with connection.cursor() as cursor:

        len_df = len(df)
        ticker_count  = 0
        commit_count  = 0
        ticker_queue = []

        for insert_df in df:
            commit_count+=1
            ticker_count+=1
            ticker_queue.append(insert_df.tolist())

            if len_df == ticker_count:
                cols = "`,`".join([str(i) for i in ['code_gbn', 'code', 'stock_date', 'stock_open','stock_high','stock_low','stock_close','volume']])

                sql = "INSERT INTO `daily_craw` (`" +cols + "`) VALUES (" + "%s,"*(df.shape[1]-1) + "%s)"
                cursor.executemany(sql,ticker_queue)

                connection.commit()
                commit_count=0
                ticker_queue = []



conn = pymysql.connect(
    user='seokjin', 
    passwd='1234', 
    host='3.36.94.44', 
    db='stock', 
    charset='utf8'
)
a = {}
stock_lsits = ['KOSPI', 'KOSDAQ', 'ETF']
try:
    curs = conn.cursor()
    sql = 'select * from stock_kospi '
    curs.execute(sql)
    rs = curs.fetchall()
    df = pd.DataFrame(rs)

    for ticker in stock_lsits:
        a[ticker] = df[df[1]==ticker]

finally:
    conn.close()

stock_lsits = ['KOSPI', 'KOSDAQ', 'ETF']

conn = pymysql.connect(
    user='seokjin', 
    passwd='1234', 
    host='3.36.94.44', 
    db='stock', 
    charset='utf8'
)

for j in stock_lsits:
    for i in a[j][0]:
        if j != 'ETF':
            df = stock.get_market_ohlcv_by_date("19000101",'20210420', i)
        else :
            df = stock.get_etf_ohlcv_by_date("19000101", "20210420", i)

        df = change_df_to_array(df,i,j)
        insert_daily_craw(df,conn)

conn.close()