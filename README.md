# Timestamp Microservice - FCC Back End Development Certification

>User stories:
>1) I can pass a string as a parameter, and it will check to see whether that string contains either a unix timestamp or a natural language date (example: January 1, 2016)
>2) If it does, it returns both the Unix timestamp and the natural language form of that date.
>3) If it does not contain a date or Unix timestamp, it returns null for those properties.

## Example usage:
```
https://surf-hook.glitch.me/July%2011,%202017
https://surf-hook.glitch.me/1499731200
```
## Example output:
```
{ "natural": "July 11, 2017", "unix": 1499731200 }
```