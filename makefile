USER = workshop
HOST = mitgovlab.org
TARGET = target/*


all: serve

serve:
	grunt

deploy:
	scp -r $(TARGET) $(USER)@$(HOST):~/public_html