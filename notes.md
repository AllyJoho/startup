# CS 260 Notes

[My startup - Simon](https://simon.cs260.click)\
I don't know what Simon is but I'm not in the mood to delete it.

## Helpful links

- [Course instruction](https://github.com/webprogramming260)
- [Canvas](https://byu.instructure.com)
- [MDN](https://developer.mozilla.org)

## Setup
Setup is kinda easy. I'm sure time will get rid of this stress but I feel like I have too many repositories open.\
Also I have no idea what's going on with AWS. They have my credit card so I have no choice but to trust them. I'm just going to trust and vibe.

## HTML
So I got behind in my work and now I'm worried about the commits spread out over multiple days. I'm going to do my best to show proper ownership but I'm a little overwhelmed because shool is just a lot sometimes.\
I understand HTML itself really well so I'm not too worried about it, but I am really bad at doing things on time.\
I pulled free icons from Chanut-is-Industries, which is a free to use platform. This consists of the image used in friends and games for the trophy.
I did design the favicon myself with google drawing though. I know one of the commits said I used AI but I ended up making my own because I didn't like it.\
I'm working on my deliverable and I feel like my placeholders are really obvious but I want to get a good grade.

## CSS
So this mark is the multiple days of commits because I am the creater of my own destiny\
Like the issue isn't that my computer is going to crash it's that I procrastinate.\
I will say my style is very simple but I did struggle.\
Honestly the main thing I learned is that AI only slows you down I did not use a single thing it gave me.\

Honestly if there's a test I'm scared I'll have to remember this
`./deployReact.sh -k <yourpemkey> -h <yourdomain> -s startup\`
`./deployService.sh -k ~/keys/Practice.pem -h scorekeep.click -s simon`

## React
So I didn't do so great on the midterm so I sat in sadness and now I'm working on this.

## Webservers
```
const express = require('express');
const app = express();

// Serve static files from the 'public' directory
app.use(express.static('public'));

app.listen(80);
app.get('/time', (req, res) => {
  res.json({ time: new Date().toDateString() });
});
```

`<scheme>://<domain name>:<port>/<path>?<parameters>#<anchor>`

# Midterm Reveiw
- Arrow syntax is when it's like a variable and funcname = () => {}
- Port 443, 80, 22 is reserved for which protocol?
  - 443 -> HTTPS, 80 -> HTTP, 22 -> SSH
- Can a DNS A record can point to an IP address or another A record.
  - A DNS A record points to an IP address; it should not point to another A record.
- What will the following code using Promises output when executed?
  - Many possibilities depending on promise behavior. Examples:
    1) Promise.resolve('Done').then(console.log) -> 'Done'
    2) Promise.reject('Error').catch(console.error) -> 'Error'
    3) new Promise(res => setTimeout(() => res('Hi'),1000)).then(console.log) -> 'Hi' after 1s
    4) Async function returns value -> printed when awaited or .then
    5) Promise chain: Promise.resolve(2).then(x=>x*2).then(x=>x+1).then(console.log) -> 5
    6) Reject handled -> shows error via catch.
- Which of the following is true for the domain name banana.fruit.bozo.click, which is the top
level domain, which is a subdomain, which is a root domain?
  - TLD: .click, root domain: bozo.click, subdomain: fruit.bozo.click (and banana.fruit.bozo.click is a nested
subdomain)
- Which of the following correctly describes JSON?
  - JSON (JavaScript Object Notation) is a text-based format for structured data using key-value pairs. Example: {
"name": "John", "age": 25 }
- What does the console command chmod, pwd, cd, ls, vim, nano, mkdir, mv, rm, man, ssh, ps,
wget, sudo do?
  - chmod - change permissions
  - pwd - print working directory
  - cd - change directory
  - ls - list files
  - vim/nano - text editors
  - mkdir - make directory
  - mv - move/rename
  - rm - remove
  - man - manual
  - ssh - remote shell
  - ps - processes
  - wget - download files
  - sudo - run as admin
- Which of the following console command creates a remote shell session?
  - ssh
- Which of the following is true when the -la parameter is specified for the ls console command?
  - ls -la lists all files (including hidden) in long format
- You can change the elements of a DOM while having the set variable name something random
- document.getElementById('animal').textContent = 'crow';
- document.getElementById('byu').style.color = 'green';
- In the CSS box model, what is the ordering of the box layers starting at the inside and working
out?
  - Order: Content -> Padding -> Border -> Margin
Diagram:
```
+----------------+
| Margin |
| +------------+ |
| | Border | |
| | +--------+ | |
| | |Padding | | |
| | |Content | | |
| | +--------+ | |
| +------------+ |
+----------------+
```
- By default, the HTML span element has a default CSS display property value of:
  - inline
- What does the following code output using getElementByID and addEventListener?
  - const btn = document.getElementById('btn');
  - btn.addEventListener('click', () => console.log('Clicked!'));
- What does the following line of Javascript do using a # selector?
  - document.querySelector('#title') selects the first element that matches the CSS selector
  - querySelector accepts any CSS selector (classes, attributes, pseudos).
  - Though ID is unique querySelector will grab the first element of a class and all that jazz
- Given this HTML and this CSS how will the images be displayed using flex?
  - If the container uses display: flex;, the images will be displayed in a row by default, side by side, unless
flex-direction: column; is specified.


# More notes
## JavaScript Async/await
code snippit
```
const coinToss = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (Math.random() > 0.1) {
        resolve(Math.random() > 0.5 ? 'heads' : 'tails');
      } else {
        reject('fell off table');
      }
    }, 1000);
  });
};

coinToss()
  .then((result) => console.log(`Toss result ${result}`))
  .catch((err) => console.error(`Error: ${err}`))
  .finally(() => console.log(`Toss completed`));

try {
  const result = await coinToss();
  console.log(`Toss result ${result}`);
} catch (err) {
  console.error(`Error: ${err}`);
} finally {
  console.log(`Toss completed`);
}
```

## Event listeners and stuff
html part\
```
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Form Example</title>
    <link rel="stylesheet" href="style.css">
  </head>

  <body>
    <form id="emailForm">
      <h2>Put your email below</h2>
      <input type="text" id="email" placeholder="Enter your email">
      <button type="submit">Submit</button>
    </form>

    <p id="message"></p>

    <!-- ✅ JS goes at the end -->
    <script src="email.js"></script>
  </body>
</html>
```
javascript part\
```
const form = document.getElementById('emailForm')
const message = document.getElementById('message')


form.addEventListener("submit", (e) => {
  e.preventDefault()
  const email = document.getElementById('email').value;
  if (email.includes('@')){
    message.textContent = "Eamil accepted";
    message.style.color = 'green'
  }
  else{
    message.textContent = "Please, enter valid email"
    message.style.color = 'red'
  }
  
})
```

## Map with array output
```
const numbers = [1, 2, 3];
const doubled = numbers.map(n => n * 2);
console.log(doubled);
Output: [2, 4, 6]
```

## Color input
```
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>background-change</title>
  </head>
  <body>
    <input id="background" type="color">
    <div id="root">Here</div>

    <script>
      const colors = document.getElementById('background')
      colors.addEventListener('change', () => {
        const color = colors.value
        document.body.style.background = color
        document.body.style.color = 'yellow'
      })
    </script>
  </body>
</html>
```