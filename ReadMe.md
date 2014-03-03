Pokey
=====

Pokey is a planning-poker tool with some fancy graphs to help you interpret the results.

## Usage

To run Pokey, install the npm modules and execute `server.coffee`

```
$ npm install
$ coffee server.coffee
   info  - socket.io started
Pokey started at http://0.0.0.0:8080
```

When you first visit the application, you will be asked to provide a nickname. This will identify you to other people in the planning room. You can then create a new planning room, or join an existing room using a special URL provided by the owner.

## Developing

Pokey is built on the following technologies:

* Backend: CoffeeScript + Node.js + Express + Socket.IO
* Frontend: Bootstrap + Angular + Socket.IO + Highcharts

### Backend Overview

Pokey keeps track of two main things: users and rooms. To keep things streamlined for users --- particularly since this is a low-security application --- there are no real accounts or authentication. Instead, the user receives a session cookie when they first load the client that serves as their credentials. Each session ID maps to at most one user.

Once the user provides a nickname, the client establishes a Socket.IO connection by providing the nickname and their session ID. If no user yet exists for that session ID, a new one is created. Otherwise the connection is associated with the existing user for that session ID.

Note that users also have a separate "user ID". This way the user can be uniquely identified to other clients without exposing their session ID, which would otherwise allow people to hijack their sessions.