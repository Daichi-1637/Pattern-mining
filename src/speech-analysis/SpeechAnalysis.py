# coding=utf-8

import sys
import scipy.io.wavfile
from scipy import signal
import numpy as np
import matplotlib.pyplot as plt
import pandas as pd
from scipy.signal import find_peaks
from falcon_cors import CORS

import json
import falcon

split_range = 10000

def normalization(data):
    return data/32768.0

def split(maximum):
    start = maximum - split_range/2
    end = split_range/2 + maximum
    return start, end

class correlation(object):
    def on_get(self, req, res, voice0, voice1):
        # load date
        rate0, data0 = scipy.io.wavfile.read("../../../voices/20191016-" + str(voice0) + "-retake.wav")
        rate1, data1 = scipy.io.wavfile.read("../../../voices/20191016-" + str(voice1) + "-retake.wav")

        #splitting
        maximum0, maximum1 = data0.argmax(), data1.argmax()
        data0 = data0[split(maximum0)[0]:split(maximum0)[1]]
        data1 = data1[split(maximum1)[0]:split(maximum1)[1]]

        # normalization
        corr = np.corrcoef(data0, data1)[0,1]
        print(corr)

        d0 = []
        d1 = []
        for i in range(split_range):
            d0.append({"data": i, "value": int(data0[i])})
            d1.append({"data": i, "value": int(data1[i])})

        data = { 
                "corr": corr,
                "data0": d0,
                "data1": d1
                }

        res.body = json.dumps(data)

cors = CORS(allow_origins_list=['http://localhost:3000'])
app = falcon.API(middleware=[cors.middleware])
app.add_route("/{voice0}/{voice1}", correlation())

if __name__ == "__main__":
    from wsgiref import simple_server
    httpd = simple_server.make_server("localhost", 8000, app)
    httpd.serve_forever()
