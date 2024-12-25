.PHONY: help setup teardown install uninstall

help:
	@cat $(firstword $(MAKEFILE_LIST))

setup: \
	vender \
	vender/ggerganov \
	vender/ggerganov/llama.cpp

install: \
	vender/ggerganov/llama.cpp/server

teardown:
	rm -rf vender

uninstall:
	rm -rf vender/ggerganov/llama.cpp/server

vender:
	mkdir -p $@

vender/ggerganov:
	mkdir -p $@

vender/ggerganov/llama.cpp:
	git clone git@github.com:ggerganov/llama.cpp.git $@

vender/ggerganov/llama.cpp/server:
	make -C vender/ggerganov/llama.cpp server

