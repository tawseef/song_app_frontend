Project Structure

Frontend (React.js/HTML/CSS/Javascript)
    a. assets:
        Contains different images and icon used in th Project.

    b. Components
        i. context
            The whole contextAPI of the application.
        ii. Dashboard
            The Dashboard of the user where user will land after logging in the application.
        iii. Login
            The Login Page of the application.
        iv. Navbar
            The Navbar of the whole application.
        v. PlaylistDisplay
            The PlaylistDisplay Component which will display only the PlayList created and the Tracks added to the PlayList by the user.
        vi. SelectPlaylist
            The SelectPlaylist Component will display only the names of the PlayList when user clicks on the Add To PlayList Button.
        vi. Signup
            The Signup Page of the application.
        vii. SongCard
            The SongCard Component will display all the card of the tracks available through the API.
    
    c. Api.js
        This is the file where all different api's are defined for the application.

How To Use The Application
    A. The User will land on the Signup Page.
    
        if user is already has the account then the user has to Login from the Login Page. 
        else needs to register.

    B. After successful Login user will redirected to the Dashboard page.

    C. On the page user will see the cards of the tracks available from the API.
            User can select any track to play it. 
            User can create any number on playlist.
            User can add any number of Tracks in the playlist.
            User can delete any track from any playlist.
            User can delete the whole playlist at any point of time.

Feature of the Application
1. Authentication required for using the application.
2. User persistancy is maintained.
3. User can resume the track from where it gets paused or stoped.
4. PlayList and Track details are stored in the database.

Application Link: 
https://songapp-lake.vercel.app/