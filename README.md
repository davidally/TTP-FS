# TTP-FS

##Stockfolio

### About
Stockfolio was made with Next.js, a server-side React framework. Server-side applications provide the benefit of faster loading on the client end as a fully rendered page is sent to the client at the cost of server processing. 

A custom server using Express was set up to implement custom routing and API endpoints. The server connects to a MongoDB Atlas cluster using the Mongoose.js library to conduct database transactions. The purpose of Stockfolio is to demonstrate full stack capabilities. Users can search real stock symbols with data being retrieved from the IEX Exchange via the IEX Cloud API. The app allows users to mimic the act of purchasing some stock and keeps a record of their transactions, it will also allow them to see their earnings/stakes fluctuate in real time via polling. IEX unfortunately charges for streaming and websocket capabilities. 



