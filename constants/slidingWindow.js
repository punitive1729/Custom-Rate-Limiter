// SLIDING_WINDOW_LOG_ALGO

const SLIDING_WINDOW_LOG_SCRIPT = `
local REQUESTS_PER_WINDOW = tonumber(ARGV[1])
local CURRENT_TIMESTAMP = tonumber(ARGV[2])
local WINDOW_SIZE_IN_MILISECONDS = tonumber(ARGV[3])
local CURRENT_WINDOW_START_TIME=CURRENT_TIMESTAMP-WINDOW_SIZE_IN_MILISECONDS

local function addCurrentTimeStamp()
    if redis.call('ZADD', KEYS[1], CURRENT_TIMESTAMP, CURRENT_TIMESTAMP) > 0
    then 
        return 'PASS'
    else
        return 'FAIL'
    end
end

if redis.call('ZCARD', KEYS[1]) < REQUESTS_PER_WINDOW
then
    return addCurrentTimeStamp()
else
    redis.call('ZREMRANGEBYSCORE', KEYS[1], 0, CURRENT_WINDOW_START_TIME)
    if redis.call('ZCARD', KEYS[1]) < REQUESTS_PER_WINDOW
    then
        return addCurrentTimeStamp()
    else
        return 'FAIL'
    end
end 
`;

module.exports = SLIDING_WINDOW_LOG_SCRIPT;
