const AWS = require('aws-sdk');

module.exports = {
    IAM_USER_KEY: 'hugorambo18', // preencha com sua chave de acesso IAM
    IAM_USER_SECRET: 'Z6dF1!51', // preencha com seu segredo de acesso IAM
    BUCKET_NAME: 'barbershop2023',
    AWS_REGION: 'us-east-2',

    uploadToS3: function(file, filename, acl = 'public-read') {
        const IAM_USER_KEY = this.IAM_USER_KEY;
        const IAM_USER_SECRET = this.IAM_USER_SECRET;
        const BUCKET_NAME = this.BUCKET_NAME;

        // Conexão com o Amazon S3
        const s3bucket = new AWS.S3({
            accessKeyId: IAM_USER_KEY,
            secretAccessKey: IAM_USER_SECRET,
            region: this.AWS_REGION,
            Bucket: BUCKET_NAME,
        });

        // Cria o bucket se ele não existir
        s3bucket.createBucket(() => {
            const params = {
                Bucket: BUCKET_NAME,
                Key: filename,
                Body: file.data,
                ACL: acl,
            };

            // Upload do arquivo para o Amazon S3
            s3bucket.upload(params, (err, data) => {
                if (err) {
                    console.log(err);
                    return Promise.resolve({ error: true, message: err.message });
                }
                console.log(data);
                return Promise.resolve({ error: false, message: data });
            });
        });
    },

    deleteFileS: function(key) {
        const IAM_USER_KEY = this.IAM_USER_KEY;
        const IAM_USER_SECRET = this.IAM_USER_SECRET;
        const BUCKET_NAME = this.BUCKET_NAME;

        // Conexão com o Amazon S3
        const s3bucket = new AWS.S3({
            accessKeyId: IAM_USER_KEY,
            secretAccessKey: IAM_USER_SECRET,
            region: this.AWS_REGION,
            Bucket: BUCKET_NAME,
        });

        // Cria o bucket se ele não existir
        s3bucket.createBucket(() => {
            s3bucket.deleteObject(
                {
                    Bucket: BUCKET_NAME,
                    Key: key,
                },
                (err, data) => {
                    if (err) {
                        console.log(err);
                        return Promise.resolve({ error: true, message: err });
                    }
                    console.log(data);
                    return Promise.resolve({ error: false, message: data });
                }
            );
        });
    },
};
















/*const AWS = require('aws-sdk')

module.exports = {
    IAM_USER_KEY: '',            //CHAVE
    IAM_USER_SECRET: '',         //USUARIO TER ACESSO COM OS BUGS, ACESSO ESTRUTURA
    BUCKET_NAME: '',             
    AWS_REGION: '',
    uploadToS3: function(file, filename, acl = 'public-read'){
        let IAM_USER_KEY = this.IAM_USER_KEY
        let IAM_USER_SECRET = this.IAM_USER_SECRET
        let BUCKET_NAME = this.BUCKET_NAME

        //conexão com meu banco de dados AWS 
        let s3bucket = new AWS.S3({
            accessKeyId: IAM_USER_KEY,
            secretAccessKey: IAM_USER_SECRET,
            Bucket: BUCKET_NAME,
        });

        s3bucket.createBucket(function(){
            var params = {
                Bucket: BUCKET_NAME,
                Key: filename, //nome arquivo
                Body: file.data, //conteudo do arquivo
                ACL: acl,           //controle de acesso 
            };

            //função para upload das informação 
            s3bucket.upload(params, function(err, data) {
                if(err){
                    console.log(err)
                    return resolve({error: true, message: err})
                }
                console.log(data)
                return resolve({error: false, message:data})
            })
        })
    },
    deleteFileS: function(key){
        return new Promise((resolve, reject) =>{
            let IAM_USER_KEY = this.IAM_USER_KEY
            let IAM_USER_SECRET = this.IAM_USER_SECRET
            let BUCKET_NAME = this.BUCKET_NAME

            let s3bucket = new AWS.S3({
                acessKeyId: IAM_USER_KEY,
                secretAcessKey: IAM_USER_SECRET,
                bucket: BUCKET_NAME,
            })
            s3bucket.createBucket(function(){
                s3bucket.deleteObject({
                    Bucket: BUCKET_NAME,
                    key: key,

                },
                function (err, data){
                    if(err){
                        console.log(err)
                        return resolve({error: true, message: err})
                    }
                    console.log(data)
                    return resolve({error: false, message: data})
                })
            })
        })

    }
}*/