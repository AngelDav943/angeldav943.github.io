const input = document.getElementById('MInput')
const output = document.getElementById('MOutput')

var last_fetch;

function getForumData() {
    return new Promise(function(resolve, reject) {
        if (!last_fetch) {
            fetch("https://angeldc943.repl.co/api/forum/get").then(res => {
                res.json().then(data => {
                    last_fetch = data;
                    resolve(data)
                    forumBasicInfo()
                })
            })
        } else {
            resolve(last_fetch)
        }
    })
}

function forumBasicInfo() {
    getForumData().then(data => {
        var total_posts = 0;
        for (let i = 0; i < data.length; i++) {
            const topic = data[i];
            total_posts += topic.posts.length;
        }

        document.getElementById('ForumInfo').innerHTML = `${data.length} topics; ${total_posts} posts`;
    })
}

forumBasicInfo()

var search = {
    post: function() {
        output.innerHTML = "searching post..."
        
        
    },
    topic: function() {
        output.innerHTML = "searching topic.."
        
        getForumData().then(data => {
            var returntopic;
            for (let i = 0; i < data.length; i++) {
                const topic = data[i];
                //console.log(`${topic.name} ?? ${input.value} || ${topic.name <= input.value}`)
                if (topic.name <= input.value) returntopic = topic.name;
            }
            return returntopic;
        }).then(topicname => {
            output.innerHTML = `Did you mean ${topicname}?`
            input.value = "";
        })
        //'general' <= 'general'
    }
}