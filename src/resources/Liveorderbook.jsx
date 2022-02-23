// require('dotenv').config()
import axios from 'axios'

const apiEndpoint = axios.create({ 
    baseURL: 'http://127.0.0.1:5000',
    timeout: 2000,
    headers: { 
        '__fngrprnt': '5588131b-f1e6-4a60-80db-21d672d44f21', 
        'jtw':'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c3IiOiJ0ZXN0IiwibHZsIjo0LCJqdGkiOiJlYzU4NGVmYzliNmU3NDU1NjNmMWVhNGMyZmRjNTJhNjQ5NzRlNWVjNGFiNTVjZDBmNDZmOGQzNmE0MmM3ODlmIiwiaWF0IjoxNjQzOTM2ODc1LCJleHAiOjE2NjEyMTY4NzV9.xWbPo-7G9aigptu_jlgajIpcFUOO8Dz9E1HN_YrTIJU'
    }

})

async function recreateFullOrderbook( fragmentedOrderbook ) {
    // http://127.0.0.1:5000/orders?begin=1640303477&end=1640303480
    // http://127.0.0.1:5000/orders?begin=1640303477&end=1640303480
    const retrivedOrderbookPromise = await apiEndpoint.get('/orders',{params: {'begin': 1640285469}})
    // console.log(retrivedOrderbookPromise)
    // console.log(retrivedOrderbookPromise.data)
    const retrivedOrderbook = retrivedOrderbookPromise.data
    // retrivedOrderbook.forEach((section, index, orderbook) => {
    //     console.log(`${index} - ${section['_id']}`)
    // })
}

recreateFullOrderbook()


class coin{
    orderbook = {'bids':null, 'asks':null}
    lastUpdateId
    addToBuffer = true
    buffer = []
    debugShowMsg = false
    constructor( symbol ){
        this.symbol = symbol
    }
    joinStream( websocket ){
        websocket.send(JSON.stringify({'method':'SUBSCRIBE','params': [this.symbol+'@depth'],'id':1}))
    }

    async setOrderbook( ){
        this.addToBuffer = true
        const ordbookResp = restEndpoint.get('/api/v3/depth', {params: {'symbol':this.symbol.toUpperCase(), 'limit':1000}})
        ordbookResp.then( response  => {
            const bids = new Map()
            const asks = new Map()
            this.lastUpdateId = response.data['lastUpdateId']
            response.data['bids'].forEach( ([price, amount]) => {
                bids.set(Number(price), Number(amount))
            })
            response.data['asks'].forEach( ([price, amount]) => {
                asks.set(Number(price), Number(amount))
            })
            this.orderbook['asks'] = asks
            this.orderbook['bids'] = bids
            this.applyBufferToOderbook()
        } )
    }

    applyOrderbookUpdate( update ){
        console.warn(`Applying update to ${this.symbol} orderbook - bidsupdateds: ${update['b'].length} askUpdates: ${update['a'].length} `)
        this.lastUpdateId = update['u']
        Object.keys(this.orderbook).forEach(side => {
            update[((side == 'asks') ? 'a' : 'b')].forEach( ([price, amount]) => {
                if (amount == 0){
                    this.orderbook[side].delete(Number(price))
                } else {
                    this.orderbook[side].set(Number(price), Number(amount))
                }
            })
            // We only keep the top 1000 prices - remove lowest bids and highest asks
            let releventPrices = Array.from(this.orderbook[side].keys())
            releventPrices = (side == 'asks') ? releventPrices.sort((a, b) => a - b) : releventPrices.sort((a, b) => b - a) 
            console.log(`${side} length : ${Array.from(this.orderbook[side].keys()).length} - ${(Array.from(this.orderbook[side].keys()).length > 1000)?'NEED TO TRIM':'looks ok'}`)
            // releventPrices.slice(1000).forEach( price => { console.log(`Trimming ${price}`); this.orderbook[side].delete(price)})
            releventPrices.slice(1000).forEach( price => this.orderbook[side].delete(price))
            console.log(`New length post trimming (if neccessary): ${Array.from(this.orderbook[side].keys()).length}`)
        })

    }
    updateOrderbookMessage( message ){
        // only apply updates when we have data to update i.e when app is first opened we dont have an orderbook to update
        // during app runtime resyncs will happen during this time it is beneficial to add the updates while also storing them to apply 
        //later as per documentation
        console.log(`Update function entered - lastupdateID : ${this.lastupdateID} - addtobuffer : ${this.addToBuffer} - is orderbook null: ${(this.orderbook['bids'] == null)?'true':'false'} `)
        if(this.addToBuffer === true){
            if( (this.buffer.length != 0) && (message['U'] != this.buffer[(this.buffer.length - 1)]['u'] + 1) ){
                //this.setOrderbook()
                throw Error(`We missed an update message for ${this.symbol}!  Resyncing orderbook (requesting entire orderbook)`)
            }
            this.buffer.push( message )
        }
        // we have an orderbook (data)
        if(this.orderbook['bids'] != null){
            // if message[U] != this.lastUpdateId + 1 we missed an update or its our first update after getting entire orderbook
            if(message['U'] != this.lastUpdateId + 1){
                if( this.lastUpdateId < message['U'] || this.lastUpdateId > message['u']){
                    console.error(`We missed an update message for ${this.symbol}!  Resyncing orderbook (requesting entire orderbook)`)
                    console.log(` ${this.symbol}   -  message[U]  : ${message['U']} -  lastupdateID : ${this.lastUpdateId}  -  message[u]  : ${message['u']} `)
                } else {
                    this.applyOrderbookUpdate( message )
                }
            } else {
                this.applyOrderbookUpdate( message )                
            }
        }
    }
    async applyBufferToOderbook(){
        console.log(`Buffer size pre u drop: ${this.buffer.length}`)
        this.buffer = this.buffer.filter( update => {console.log(`Dropping update for ${this.symbol}- lastUpdateID: ${this.lastUpdateId} , update[U]: ${update['U']}, update[u]: ${update['u']}`); return update['u'] > this.lastUpdateId })
        console.log(`Buffer size after u drop: ${this.buffer.length}`)
        // The first processed event should have U <= lastUpdateId+1 AND u >= lastUpdateId+1.
        if( this.buffer.length != 0){
            if( (this.buffer[0]['U'] <= this.lastUpdateId +1 && this.buffer[0]['u'] >= this.lastUpdateId + 1)){
                this.buffer.forEach( update => this.applyOrderbookUpdate(update))
            } else {
                console.error(`Discrepency between updates in buffer (length:${this.buffer.length}) and retreived orderbook -\n lastUpdateID: ${this.lastUpdateId} \n  update: ${JSON.stringify(this.buffer)}`)
            }
        } else {
            console.log(`buffer empty moving on`)
        }
        this.addToBuffer = false
        this.buffer = []
    }
}


function handleWebsocketMessages( message, securitiesRef ){

    if (message.hasOwnProperty('stream')){
        switch(message['data']['e']){
            case 'depthUpdate':
                // console.log(`Update to ${message['data']['s'].toLowerCase()} orderbook received`)
                securitiesRef[message['data']['s'].toLowerCase()].updateOrderbookMessage(message['data'])
                break
            case 'aggTrade':
                console.log(` ${message['s']} trade happened`)
                break
            case 'result':
                console.log(`Successfully (un)subscribed to market stream`)
                break
            default:
                console.log(`Unrecognsed Message: ${message}` )
        }
    } else if( message.hasOwnProperty('result')){
        if(message['result'] == null){
            console.log('Successfully (un)subscribed')
        } else {
            console.log(`Unrecognised confirmation: ${message}`)
            // let allStreams = ''
            // message['result'].forEach((stream, index) => {
            //     allStreams+=((index == 0)? ' ' : ', ')+stream
            // })
            // console.log(`Successfully Subscribed to: ${allStreams}`)
        }
    } else {
        console.warn(`Unrecorgnised websocket response/message: ${message}`)
    }
}


async function createLiveDataSource( source ){
        let apiurl, websocketendpoint;
        switch(source){
            case 'binance':
                apiurl = 'https://api.binance.com'
                // websocketendpoint = 'wss://stream.binance.com:9443/ws/btcusdt@depth'    // works
                websocketendpoint = 'wss://stream.binance.com:9443/stream?streams='
                break
            case 'kucoin':
                apiurl = 'kucoi apiurl'
                websocketendpoint = ''
                break
            case 'coinbase':
                apiurl = 'coinbase api endpoint'
                websocketendpoint = ''
                break
            case 'kraken':
                apiurl = 'apiurl for kraken api'
                websocketendpoint = ''
                break
            case 'ftx':
                apiurl = 'ftx apiurl'
                websocketendpoint = ''
                break
            default:
                apiurl = 'https://api.binance.com'
                websocketendpoint = ''
        }
        const liveDataSource = axios.create({
            baseURL: apiurl,     // performance issue? alternatives: https://<api1, api2, api3>.binance.com
            timeout: 2000
            
        })

        let marketDataStream = new WebSocket(websocketendpoint)
        marketDataStream.onopen = () => {
            console.log(`Seccessfully connected to websocket server`)
            // marketDataStream.send(JSON.stringify({'method':'UNSUBSCRIBE', 'params':['btcusdt@depth'], 'id':2}))
        }

        marketDataStream.onmessage = event => {
            // handleWebsocketMessages(JSON.parse(event.data))
            console.log(`Received message: ${JSON.parse(event.data)} `)
        }

        marketDataStream.onclose = event => {
            if (event.wasClean) {
                console.error(`Websocket Disconnected - Cleanly - code=${event.code} reason=${event.reason}`);
            } else {
                console.error(`Websocket Disconnected - Uncleanly - code=${event.code} reason=${event.reason}\n${event}`);
            }
        }

        marketDataStream.onerror = error => {
            console.error(`Websocket error occured: ${error.message}`)
        }

        const ping = await liveDataSource.get('/api/v3/ping')
        if (ping.status == 200){
            // wait until websoccet connects
            console.log('Successfull REST endpoint ping')
            if (marketDataStream.readyState != 1){
                let waitIterations = 0
                while(marketDataStream.readyState != 1 && waitIterations < 10){
                    await new Promise(resolve => setTimeout(resolve, 250))
                    waitIterations++
                }
            }
            return [ liveDataSource, marketDataStream ]
        } else {
            throw Error('Couldnt reach server')
        }
}

const [ restEndpoint , wsStream ] = await createLiveDataSource('binance')

let securities = ['btcusdt']        // , 'dotusdt'

let securitiesList = securities.reduce((returnObj, security) => {
    const newSecurity = new coin(security)
    newSecurity.joinStream( wsStream )
    setTimeout(() => {newSecurity.setOrderbook()}, 2000)
    returnObj[security] = newSecurity
    return returnObj
}, {})

console.log(`securitiesList type: ${typeof(securitiesList)} \n contains: ${securitiesList}`)
console.log(securitiesList)

wsStream.onmessage = message => {
    handleWebsocketMessages(JSON.parse(message.data), securitiesList)
}



document.getElementById('stopWebsocket').addEventListener('click', () => {
    wsStream.close()
})