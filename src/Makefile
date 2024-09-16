.PHONY: all
all:
	-npx webpack --config webpack.config.js
	-npx rspack --config webpack.config.js

.PHONY: clean
clean:
	$(RM) a.test.*.js

.PHONY: test
test:
	-for file in a.test.*.js; do echo $$file; node $$file; done
