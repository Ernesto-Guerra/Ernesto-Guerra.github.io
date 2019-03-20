# using SendGrid's Python Library
# https://github.com/sendgrid/sendgrid-python
import sendgrid
import os
from sendgrid.helpers.mail import *
import datetime

now=datetime.datetime.now()

sg = sendgrid.SendGridAPIClient(apikey='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')
from_email = Email("173216@ids.upchiapas.edu.mx")
to_email = Email("mmoreno@ids.upchiapas.edu.mx")
subject = "Cliente-Servidor Ernesto Guerra IDS"
content = Content("text/plain", "Mensaje enviado automaticamente a las: "+str(now)+"  por Ernesto Alberto Guerra Cuessy  IDS  5A  173216")
mail = Mail(from_email, subject, to_email, content)
response = sg.client.mail.send.post(request_body=mail.get())
print(response.status_code)
print(response.body)
print(response.headers)


