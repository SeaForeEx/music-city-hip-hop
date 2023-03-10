<h1><strong>Music City Hip-Hop</strong></h1>

<a href="https://music-city-hip-hop-c4.netlify.app/">Join the Music City Hip-Hop Community!</a>

<h2>Topics</h2>
<li><a href="#overview">Overview</a></li>
<li><a href="#mvpfeatures">MVP Features</a></li>
<li><a href="#checkitout">Check It Out Yourself</a></li>
<li><a href="#planning">Planning The New Era of Music in Nashville</a></li>
<li><a href="#snippets">Code Snippets</a></li>
<li><a href="#techstacks">Tech Stacks for Music City Hip-Hop</a></li>

<h2><a id="overview">Overview</a></h2>
<p>Music City Hip-Hop is a Social App that gives Nashville emcees/producers a platform to Create a profile and Read, Update, and Delete their information.  Artists can post their image, name, and bio along with links to their music and upcoming events they will be performing at.  Fans can also join the site by creating a profile and Read, Update and Delete their name, image, and bio while they search the page for artists they already enjoy and maybe discover some new ones.</p>

<p>Let's face it, Nashville is mainly known for country music acts.  But we were first known as "Music City" because of the world-renowned Fisk Jubilee Singers.  There is a diverse music scene bubbling under the surface, and this App is dedicated to giving the burgeoning rap scene the spotlight.  Forget Broadway, Music City Hip-Hop is where it's at!</p>

<h2><a id="mvpfeatures">MVP Features</a></h2>
<ul><em>Users</em></ul>
<li>Sign in via Google Authentication</li>
<li>If it is their first time visiting the site, users are directed to a form that lets them create their profile</li>
<li>New users enter in a name, image, and bio of their choosing and then are directed to the main site</li>
<li>Users can read, update, and delete their profile at any time</li>
<li>Users can Sign Out of the website on their profile</li>
<br>

<ul><em>Artists</em></ul>
<li>Artists are a sub-category of Users</li>
<li>Artists can also Create, Read, Update, and Delete Links and Events</li>
<li>When you click on a link you see its name and a URL</li>
<li>When you click on an event you see its venue, date, time, and price</li> 
<li>Complete list of artists is shown on the main page to be browsed by everyone</li>
<br>

<ul><em>Fans</em></ul>
<li>Fans are a sub-category of Users</li>
<li>As of MVP, fans are not displayed on a page like artists</li>
<li>Fans can see their own name, image, and bio on their profile</li>
<br>

<img width="40%" alt="Screen Shot 2023-03-09 at 12 36 44 PM" src="https://user-images.githubusercontent.com/113273122/224122933-0a723301-5a38-4428-8be9-49eb8255854f.png">

<ul><em>Links</em></ul>
<li>Links are shown on ViewUser and Artist Profile pages</li>
<li>Artists can post links to their own sites, albums on Spotify/Bandcamp, articles, etc.</li>
<br>

<ul><em>Events</em></ul>
<li>Events are shown on ViewUser and Artist Profile pages</li>
<li>Artists can post events for their fans to attend</li>
<li>EventView page shows the following details for the event: venue, date, time, and price</li>
<br>

<img width="40%" alt="Screen Shot 2023-03-09 at 12 38 35 PM" src="https://user-images.githubusercontent.com/113273122/224123269-c947f348-461e-4662-bf76-8a67485d15c7.png">

<ul><em>Search Bar</em></ul>

<li>The Search Bar in the Navigation Bar allows the User to search for Artists by Artist Name</li>
<li>Any Artists that meet the search criteria are shown in the Search Query page, and can be navigated to by clicking the View Button</li>
<br>

<img width="40%" alt="Screen Shot 2023-03-09 at 1 56 38 PM" src="https://user-images.githubusercontent.com/113273122/224139732-816715ec-3dca-48a4-8955-ac0b7e627552.png">

<ul><em>Profile</em></ul>
<li>Users can Read, Update, and Delete their Profile on this page</li>
<li>Fan Profile displays their name, image, and bio</li>
<li>Artist Profile displays name, image, bio, links, and events</li>
<li>Artists can Create, Read, Update, and Delete links on Profile</li>
<li>Artists can Create, Read, Update, and Delete Events on Profile</li>
<br>

<img width="20%" alt="Screen Shot 2023-03-09 at 2 07 26 PM" src="https://user-images.githubusercontent.com/113273122/224142639-b45187ed-5a2f-4e95-890a-02185188cd3a.png">

<h2><a id="checkitout">Check It Out Yourself</a></h2>
Music City Hip-Hop has been deployed on Netlify, and can be viewed <a href="https://music-city-hip-hop-c4.netlify.app">here</a>.
<br>

<h2><a id="planning">Planning</a></h2>
ERD for MCHH MVP
<br>

<img width="50%" alt="Screen Shot 2023-03-09 at 2 23 39 PM" src="https://user-images.githubusercontent.com/113273122/224146957-a60164e2-33cf-40e4-bba4-b8a2a98459e8.png">

Wireframe for MCHH MVP
<br>

<img width="40%" alt="Screen Shot 2023-03-09 at 2 26 55 PM" src="https://user-images.githubusercontent.com/113273122/224147810-84ad8527-693b-4638-90ee-0caa64ee1666.png">

Click <a href="https://dbdiagram.io/d/63eae5b6296d97641d80aaa6">here</a> to check out my ERD on dbdiagram

Click <a href="https://www.figma.com/file/DyMq7NLL0ZbMvPpH8B6nOl/Music-City-Hip-Hop?node-id=0-1&t=sw5uU1Ns89NTVagC-0">here</a> to check out my Wireframes on Figma

Click <a href="https://github.com/users/SeaForeEx/projects/1">here</a> to check out the tickets for my Capstone on my Project Board for MVP on GitHub

<h2><a id="snippets">Code Snippets</a></h2>
Code I used to direct New Users to a Form to input their info
<br><br>

authContext.js
<br>
<img width="40%" alt="Screen Shot 2023-03-09 at 2 49 01 PM" src="https://user-images.githubusercontent.com/113273122/224154043-32ea9da4-0701-4223-a8a1-a2592c91cc82.png">

ViewDirector.js
<br>
<img width="40%" alt="Screen Shot 2023-03-09 at 2 50 52 PM" src="https://user-images.githubusercontent.com/113273122/224154573-6a950fd2-f9e4-4d2c-b4f3-597f8ed02e10.png">

UserForm.js
<br>
<img width="395" alt="Screen Shot 2023-03-09 at 3 01 29 PM" src="https://user-images.githubusercontent.com/113273122/224156929-620e868a-8c2c-41bb-9ac9-a102d41c3ba8.png">

<h2><a id="techstacks">Tech Stacks</a></h2>
<li>React</li> 
<li>nextjs</li> 
<li>Firebase</li> 
<li>CSS3</li> 
<li>HTML5</li> 
<li>Bootstrap</li> 
<li>Figma</li>
<br>
<h2>Contributors</h2>
<a href="https://github.com/SeaForeEx">Charles Bridgers IV</a>
