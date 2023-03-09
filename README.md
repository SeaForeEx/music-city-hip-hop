<h1><strong>Music City Hip-Hop</strong></h1>

<a href="https://music-city-hip-hop-c4.netlify.app/">Join the Music City Hip-Hop Community!</a>

<h2>Topics</h2>
<li><a href="#overview">Overview</a></li>
<li><a href="#mvpfeatures">MVP Features</a></li>
<li><a href="#trytheapp">Try the App Yourself</a></li>
<li><a href="#planning">Planning to Get Shit Done</a></li>
<li><a href="#snippets">Code Snippets</a></li>
<li><a href="#techstacks">Tech Stacks for Get Shit Done</a></li>

<h2><a id="overview">Overview</a></h2>
Get Shit Done is a Project Planning App that allows a User to Create, Read, Update and Delete a Project, and then maintain full CRUD on Tasks and Materials associated with the Project.

Planning is hard. Maintaining details on several projects at once can easily lead to disorganization. GSD was designed to help organize details and maintain the scope of several projects at once, all in one place. Not only can Tasks be easily seen in the Project Details for initial planning and implementation, but also Materials are easliy assigned to Tasks, and also tallied up so the User can see the Estimated Cost of the Project.

<h2><a id="mvpfeatures">MVP Features</a></h2>
Projects:

Sign in via Google Authentication
Add a new Project to see the project folder visible on the home page with all other open projects.
Clicking the Project folder takes the User to the Project Details page which has the open Tasks and Materials associated with the Project. Also this page contains the Date Created, and Estimated Cost of the Project.
The Actions dropdown has options for the User to Edit the Project Name, Delete the Project, Add a Task, or Add a Material.
Deleting a Project also deletes all associated Tasks and Materials.




Tasks:

Task Cards on the Project Details page show the Status (not started, in progress, complete) an the Due Date.
Clicking the dropdown has options for the User to view the Task Details page, Edit the Task, or Delete the Task.
Clicking the Task Name also takes the User to the Task Details Page.
The Task Details Page shows the associated Project, Date Created, Due Date, and the Task Details.
The dropdown has options for the User to Edit or Delete the Task.


Materials:

Material Cards on the Project Details page show the Status (acquired, not acquired) and the associated Task.
Clicking the dropdown has options for the User to view the Material Details page, Edit the Material, or Delete the Material.
Clicking the Material Name also takes the User to the Material Details Page.
The Material Details Page shows the Total Material Cost, associated Project and Task, Status, Price, and Quantity.
The dropdown has options for the User to Edit or Delete the Material.


Search:

The Search input in the Navigation Bar allows the User to search for Projects by Project Name, Task Name, or Material Name.
Any Projects that meet the search criteria are shown in the Search Query page, and can be navigated to by clicking the Project Folder or Name.


<h2><a id="trytheapp">Try The App Yourself</a></h2>
Get Shit Done has been deployed on Netlify, and can be viewed here.

<h2><a id="planning">Planning</a></h2>
ERD for GSD MVP


Screenshot of Wireframe with Next JS Routes


Link to ERD

Link to Figma Wireframe

Link to Github tickets for Get Shit Done - MVP

<h2><a id="snippets">Code Snippets</a></h2>
Dynamic Search Page


Merged Data API Calls


<h2><a id="techstacks">Tech Stacks</a></h2>
React nextjs Firebase CSS3 HTML5 Bootstrap Figma
Contributors
Eric Frey
