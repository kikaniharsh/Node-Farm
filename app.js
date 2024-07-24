const http = require('http')
const fs = require('fs')
// 1
const url = require('url')
const server = http.createServer((req, res) => {
    // console.log(req.url);

    const jsondata = fs.readFileSync('./data/data.json', 'utf-8')
    const data = JSON.parse(jsondata)
    const urlData = url.parse(req.url, true)
    // console.log(urlData);
    // 2.path ne chuto padva mate
    const pathname = urlData.pathname
    // console.log(urlData);
    if (pathname == "/") {
        sum = 0

        for (i = 0; i < data.length; i++) {

            // organic hoii tooo print thavu pade....
            let org = ""
            if (data[i].organic == true) {
                org = "organic"
            }
            else {
                org = ""
            }

            // file ne replce karavi...
            sum = sum + fs.readFileSync('./product/card2.html', 'utf-8')
                .replace('[image]', data[i].image)
                .replace('[productName]', data[i].productName)
                .replace('[organic]', org)
                .replace('[quantity]', data[i].quantity)
                .replace('[price]', data[i].price)
                // 5
                .replace('[[id]]', i)
        }
        const data2 = fs.readFileSync('./product/overview.html', 'utf-8')
        .replace('[[alldata]]', sum)
        res.write(data2)
    }
    // 3 pathname aapvu
    // 4 id ne uniqe name aapvi file maa
    else if (pathname == "/p") {
        const index = urlData.query.id
        if (index <= data.length) {
            let org1 = ""
            if (data[index].organic == true) {
                org1 = "organic"
            }
            else {
                org1 = ""
            }

            const hk = fs.readFileSync('./product/product2.html', 'utf-8')
                .replace('[Organic]', org1)
                .replace('[productName]', data[index].productName)
                .replace('[from]', data[index].from)
                .replace('[nutrients]', data[index].nutrients)
                .replace('[quantity]', data[index].quantity)
                .replace('[price]', data[index].price)
                .replace('[price]', data[index].price)
                .replace('[description]', data[index].description)
                .replace('[image1]', data[index].image)
                .replace('[image2]', data[index].image)
                .replace('[image3]', data[index].image)
                .replace('[image4]', data[index].image)
                .replace('[image5]', data[index].image)
                .replace('[image6]', data[index].image)
                .replace('[image7]', data[index].image)
                .replace('[image8]', data[index].image)
                .replace('[image9]', data[index].image)

            res.write(hk)
        } else {
         
                res.write("<h1>this</h1>")
                res.write("<h1>is</h1>")
                res.write("<h1>Error</h1>")
                res.write("<h1>404</h1>")
        }

    }
    res.end()
})
server.listen(4001)