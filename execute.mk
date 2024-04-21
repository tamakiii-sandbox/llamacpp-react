.PHONY: help server

MODEL ?= $(firstword $(shell find $(HOME)/.cache/lm-studio/models -name '*.gguf' -exec du -h {} + | sort -r -h | awk '{ print $$2 }'))
CONTEXT_SIZE := 4096

help:
	@cat $(firstword $(MAKEFILE_LIST))

server: vender/ggerganov/llama.cpp/server
	$< -m $(MODEL) -c $(CONTEXT_SIZE)
