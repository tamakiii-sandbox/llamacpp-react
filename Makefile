.PHONY: help setup teardown

help:
	@cat $(firstword $(MAKEFILE_LIST))

setup: \
	vender \
	vender/ggerganov \
	vender/ggerganov/llama.cpp

teardown:
	rm -rf vender

vender:
	mkdir -p $@

vender/ggerganov:
	mkdir -p $@

vender/ggerganov/llama.cpp:
	git clone git@github.com:ggerganov/llama.cpp.git $@

