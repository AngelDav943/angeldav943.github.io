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

function hamming_distance(string1, string2) {
	var dist_counter = 0
    for (let n = 0; n < string1.length; n++) {
        
        if (string1[n] != string2[n]) dist_counter += 1
    }
	return dist_counter
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
        
        setTimeout(function() {
            output.innerHTML = "Error finding post."
            input.value = ""
        },2000)
    },
    topic: function() {
        output.innerHTML = "searching topic.."
        
        getForumData().then(data => {
            var returntopic;
            var def = 5;
            for (let i = 0; i < data.length; i++) {
                const topic = data[i];

                if (hamming_distance(topic.name,input.value) <= def) {
                    def--;
                    returntopic = topic.name
                }

            }
            return returntopic;
        }).then(topicname => {
            output.innerHTML = `Did you mean ${topicname}?`
            input.value = "";
        })
        //'general' <= 'general'
    },
    suggestion: function() {
        var suggestion = document.getElementById('MSuggest')
        getForumData().then(data => {
            var returntopic;
            var def = 5;
            for (let i = 0; i < data.length; i++) {
                const topic = data[i];

                if (hamming_distance(topic.name,input.value) <= def) {
                    def--;
                    returntopic = topic.name
                }

            }
            return returntopic;
        }).then(topicname => {
            suggestion.innerHTML = `Did you mean ${topicname}?`
        })
    }
}