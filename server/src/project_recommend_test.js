const spawn = require('child_process').spawn;

const result = spawn('python3', ['project_recommend.py', '1', '1']);

result.stdout.on('data', function(data){
    console.log(data.toString());
})

result.stderr.on('data', function(data){
    console.error(data.toString());
})