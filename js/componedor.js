const footerURL = "/fragments_gooter.html"

fetch(footerURL)
   .then( r => r.text() )
   .then( t => console.log(t) )

