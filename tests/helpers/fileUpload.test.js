import { v2 as cloudinay } from 'cloudinary'
import { fileUpload } from "../../src/helpers/fileUpload"

cloudinay.config({
    cloud_name: 'dxrrfzgnq',
    api_key: '251756254699425',
    api_secret: 'yv5wfoAkAaBXQsl5m4RDNnJXhmo',
    secure: true
})

describe('Pruebas en fileUpload', () => { 

    test('Debe de subir el archivo correctamente a clodinary', async() => { 
        
        const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2X0TaYFXSX_TjADKSE90MbeknAz0WjdPk2w&usqp=CAU'
        const resp = await fetch (imageUrl)
        const blob = await resp.blob()
        const file = new File([blob], 'foto.jpg')

        const url = await fileUpload(file)

        expect( typeof url ).toBe('string')

        const segments = url.split('/')
        const imageId = segments[ segments.length - 1 ].replace('.jpg', '')

        //await cloudinay.api.delete_all_resources(['journal/'+ imageId ])

        console.log(imageId)
     })

     test('debe retornar null', async() => { 
        
        const file = new File([], 'foto.jpg')

        const url= await fileUpload(file)
        expect(url).toBe(null)

      })

 })