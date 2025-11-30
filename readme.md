# Meow
A meow protocol
## What is it
Meow is a web based browser for the meow:// protocol
## How does it work?
When you open a page it searches for its ip address in the database and if there is one then it sends a GET request to it. The response will contain all things about the page. The body.content can contain plain text or HTML (only the inside of the <body> tag)
### Example json response:
`{
    head: {
        title: "Example page",
        description: "This is a example page"
    },
    body: {
        content: "Hello world!"
    }
}`
Explanation: the head contains the metadata. Like the title (<title></title> in HTML), or the description. The body contains the body of the page (<body></body> in html)
## How to make your website here
You will need:
- a public ip address or a domain name
- knowing how to respond to a get request in any programming lunguage
- a server
What you need to do:
1. You have to make a server that will response to a get request with the examole above.
2. Log in using GitHub
3. Make your domain name on the dashboard. Make sure that the ip is the server's ip (include the http:// or https://).
4. Test it!
If there are any problems then contact me