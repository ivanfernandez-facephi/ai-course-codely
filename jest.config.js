module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	cacheDirectory: '.tmp/jestCache',
	transform: {
		'^.+\\.ts?$': 'ts-jest'
	}
};
