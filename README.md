# express-project 

An auction based third party selling site with 2 models


1.) Users - Register, login, and store data in the users profile.
              - Users will post photos of products, price , and description.
              - Users will be able to view other users products and purchase (BUY NOW)
              - Users profile will display all products available
              -User wil be alerted when product is purchased by other user
             
            
              
       Schema:
              username 
              password
              Products[name, photo, price, description] 
             
2.) Posts(Products the Users are selling)
      - Price and description will in the products.
      - Products have a status of sold/available
       
      
      Schema: 
              name
              photo
              set price
              description
              buyer
             
             
 Project Flow
 
 Home screen will give you a login/ regisatration page
 While cycling through different product photots
 Once logged in re direct to the User show page - this will display the Users "Profile" with users products and purchases
 
 The user will have the option in his profile to "create" and upload a product to sell of his own.
 
 The Product will display in a form its name, price and description.
 
 The user will be able to click a button linked to the product to purchase it.
 
 Who does what
 
 - Nick: products controller 
 
 - Shhadi: users controller
 
 - Veda: login and registration 
 
 
 BONUS:
 
  - add a 'cart'
  - add a 3rd model for bidding 
  - All items user has purchased/sold?
  - will be able to view which user purchased this item
 
      
      
      
      



