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