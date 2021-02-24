const express = require('express')
const cors = require('cors')
const rp = require('request-promise');
const $ = require('cheerio');
const http = require('http')

const lmsTimeTableUrl = "https://lms.aotawhiti.school.nz/?q=timetable"

global.TimeTableApp = express()
global.TimeTableServer = http.createServer(TimeTableApp)

TimeTableApp.use(cors())

// TimeTableApp.get('/', (req, res) => {
// 	rp(lmsTimeTableUrl).then((html) => {
// 			console.log($('div > table', html));
// 		})
// 	res.send("Thanks for nothing!")
// })

rp(lmsTimeTableUrl).then((html) => {
	let tables = $('div table tbody', html)
	for(let tableNo = 0; tableNo < tables.length; tableNo++){
		let table = tables[tableNo]
		console.log(table.children.filter((TheNode) => {
			return TheNode.type === 'tag'
		})[0])
	}
}).catch((error) => {
	console.error(error)
})

// TimeTableServer.listen(8924)