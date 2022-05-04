A set of useful utils for http methods. Includes converter/validator for http query params or body attributes, custom error types.

## Converter/validator
How to use:
```javascript
  const { Converter, ValidationError } = require('@rfcx/http-utils')
  const convertedParams = {}
  const params = new Converter(req.body, convertedParams, { camelize: true })

  params.convert('filename').toString()
  params.convert('duration').toInt().minimum(1)
  params.convert('sample_rate').toInt().default(1).minimum(1)
  params.convert('channels_count').optional().toInt().default(1).minimum(1)
  params.convert('bit_rate').toInt().default(1).minimum(1)
  params.convert('audio_codec').toString()
  params.convert('sha1_checksum').toString()
  params.convert('meta').optional()

  params.vaidate()
    .then(() => {
      res.json{{
        sampleRate: convertedParams.sampleRate
        filename: convertedParams.filename,
        duration: convertedParams.duration
      }}
    })
    .catch((err) => {
      // handle custom error with type `ValidationError` here
    })
```

Available converters/validators:
function name | description | example
------------ | ------------- | -------------
default | sets default value for param | .default(true)
optional | marks param as not required (won't throw ValidationError message for it) | .optional()
toFloat | checks if param is numeric, converts it to float | .toFloat()
minimum | checks if param is higher than specified value | .minimum(10)
maximum | checks if param is lower than specified value | .maximum(100)
minLength | checks if param string is longer than specified length | .minLength(3)
maxLength | checks if param string is shorter than specified length | .maxLength(20)
nonEmpty | checks if param string is not empty | .nonEmpty()
toUuid | checks if param is valid uuid string | .toUuid()
toLatitude | checks if param is valid latitude (min -90, max 90) | .toLatitude()
toLongitude | checks if param is valid longitude (min -180, max 180) | .toLongitude()
toMoment | checks if param is valid ISO8601 datetime string, converts to moment.js object with specified timezone | .toMoment('America/Los_Angeles')
toMomentUtc | checks if param is valid ISO8601 datetime string, converts to moment.js object with UTC timezone | .toMomentUtc()
toMomentUtc | checks if param is valid ISO8601 datetime string, converts to moment.js object with UTC timezone | .toMomentUtc()
toQuantumTime | checks if param is valid ISO8601 datetime string, converts to moment.js object with abs() seconds | .toQuantumTime()
toDateString | checks if param is valid ISO8601 datetime string, converts to string with format "YYYY-MM-DD" | .toQuantumTime()
toTimeInterval | checks if param is valid interval value (1d, 10secs, etc) | .toTimeInterval()
toAggregateFunction | checks if param is valid aggregate function value (`count`, `sum`, `avg`, `min`, `max`) | .toAggregateFunction()
toInt | checks if param is valid integer | .toInt()
toNonNegativeInt | checks if param is valid positive integer | .toNonNegativeInt()
toString | checks if param is valid string | .toString()
toLowerCase | converts string to lowercased | .toLowerCase()
trim | converts string to string without spaced at the beginning and end | .trim()
objToString | converts object to string | .objToString()
toBoolean | checks if param is valid boolean | .toBoolean()
toArray | converts single item into array | .toArray()
toIntArray | converts single item into array, checks if all items are integers | .toIntArray()
toFloatArray | converts single item into array, checks if all items are floats | .toFloatArray()
nonEmptyArrayItem | checks if array is not empty | .nonEmptyArrayItem()
isObject | checks if param is object | .isObject()
isValidTimezone | checks if param is valid timezone valie (`America/Los_Angeles`) | .isValidTimezone()
isEqualToAny | checks if param is equal to any of specified in the array | .isEqualToAny(['aaa', 'bbb', 'ccc'])
isPassingRegExp | checks if param is passing specified regular expression | .isPassingRegExp(/[a-z0-9]{12}/, 'should consist of 12 lower-cased characters or digits')

## Publishing

Publishing to NPM registry is done automatically via GitHub Actions once new release is published in the GitHub repository.
You must have `NPM_PUBLISH_TOKEN` secret to be defined in your repository or organization. Reference [this](https://docs.github.com/en/actions/security-guides/encrypted-secrets) or [this](https://sergiodxa.com/articles/github-actions-npm-publish#configure-the-secret) for instructions.
