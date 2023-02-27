## JWT 认证

### 概念

JSON Web Token（缩写 JWT）是目前最流行的跨域认证解决方案

### 原理

服务器认证用户后，生成一个有关该用户信息的 JSON 对象。用户与服务端通信的时，都要发回该 JSON 对象，服务器完全只靠这个对象认定用户身份。

### 数据结构

JWT 由 Header、Payload、Signature三部分组成，如图所示：

![](./数据结构.jpg)

1. Header
   
   Header 部分是一个 JSON 对象，描述 JWT 的元数据，通常是下面的样子:
   
   ```json
   {
     "alg": "HS256",
     "typ": "JWT"
   }
   ```
   
    上面代码中，alg属性表示签名的算法（algorithm），默认是 HMAC SHA256（写成 HS256）；typ属性表示这个令牌（token）的类型（type），JWT 令牌统一写为JWT。最后，将上面的 JSON 对象使用 Base64URL 算法（详见后文）转成字符串。
   
2. Payload
   Payload 部分也是一个 JSON 对象，用来存放实际需要传递的数据。JWT 规定了7个官方字段，供选用：

   ```
   iss (issuer)：签发人
   exp (expiration time)：过期时间
   sub (subject)：主题
   aud (audience)：受众
   nbf (Not Before)：生效时间
   iat (Issued At)：签发时间
   jti (JWT ID)：编号
   ```

   除了官方字段，你还可以在这个部分定义私有字段，下面就是一个例子：

   ```json
   {
     "sub": "1234567890",
     "name": "John Doe",
     "admin": true
   }
   ```

   注意：JWT 默认是不加密的，任何人都可以读到，所以不要把秘密信息放在这个部分。这个 JSON 对象也要使用 Base64URL 算法转成字符串。

3. Signature

    Signature 部分是对前两部分的签名，防止数据篡改。首先，需要指定一个密钥（secret）。这个密钥只有服务器才知道，不能泄露给用户。然后，使用 Header 里面指定的签名算法（默认是 HMAC SHA256），按照下面的公式产生签名：

    ```javascript
    HMACSHA256(base64UrlEncode(header) + "." + base64UrlEncode(payload), secret)
    ```

### 交互方式

1. 客户端收到服务器返回的 JWT，可以储存在 Cookie 里面，也可以储存在 localStorage
2. 客户端每次与服务器通信，都要带上这个 JWT。你可以把它放在 Cookie 里面自动发送，但是这样不能跨域，所以更好的做法是放在 HTTP 请求的头信息Authorization字段里面，如Authorization: Bearer。

### 实现方式（以node-jsonwebtoken为例）

1. 安装依赖并导入模块

2. 生成token

   ```javascript
   jwt.sign(payload, secretOrPrivateKey, [options, callback])
   ```

3. 验证token

   ```javascript
   jwt.verify(token, secretOrPublicKey, [options, callback])
   ```

### 特点

1. JWT 默认是不加密，但也是可以加密的。生成原始 Token 以后，可以用密钥再加密一次
2. JWT 不加密的情况下，不能将秘密数据写入 JWT
3. JWT 不仅可以用于认证，也可以用于交换信息。有效使用 JWT，可以降低服务器查询数据库的次数
4. JWT 的最大缺点是，由于服务器不保存 session 状态，因此无法在使用过程中废止某个 token，或者更改 token 的权限。也就是说，一旦 JWT 签发了，在到期之前就会始终有效，除非服务器部署额外的逻辑
5. JWT 本身包含了认证信息，一旦泄露，任何人都可以获得该令牌的所有权限。为了减少盗用，JWT 的有效期应该设置得比较短。对于一些比较重要的权限，使用时应该再次对用户进行认证
6. 为了减少盗用，JWT 不应该使用 HTTP 协议明码传输，要使用 HTTPS 协议传输

### 官网

https://jwt.io/libraries

https://github.com/auth0/node-jsonwebtoken