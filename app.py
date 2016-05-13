#
#

import os
import serial
from bottle import route, run, template, static_file
from threading import Timer

# ser = serial.Serial('/dev/cu.usbmodem1411',9600)

@route('/')
def home():
    return template('Hack.html')

@route('/location')
def location():
    return template('location.html')

@route('/static/<filename>')
def server_static(filename):
    return static_file(filename, root=os.getcwd())

@route('/sons/<filename>')
def server_sons(filename):
    return static_file(filename, root=os.path.join(os.getcwd(), 'sons'))


@route('/smell')
def smell():
    pass
    # ser.write('1\n')
    # t = Timer(5.0, stopSmell)
    # t.start()

def stopSmell():
    pass
    # ser.write('0\n')



run(host='0.0.0.0', port=int(os.environ.get('PORT', 5000)))
