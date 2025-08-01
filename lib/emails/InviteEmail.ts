export const signupHTMLTemplate = (
  username: string,
  email: string,
  password: string,
  loginUrl: string
) =>
  `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="x-apple-disable-message-reformatting" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="color-scheme" content="light dark" />
        <meta name="supported-color-schemes" content="light dark" />
        <title></title>
        <style type="text/css" rel="stylesheet" media="all">
          @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");
          body {
            width: 100% !important;
            height: 100%;
            margin: 0;
            -webkit-text-size-adjust: none;
          }
    
          a {
            color: #3869d4;
          }
    
          a img {
            border: none;
          }
    
          td {
            word-break: break-word;
          }
    
          .preheader {
            display: none !important;
            visibility: hidden;
            mso-hide: all;
            font-size: 1px;
            line-height: 1px;
            max-height: 0;
            max-width: 0;
            opacity: 0;
            overflow: hidden;
          }
    
          body,
          td,
          th {
            font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
          }
    
          h1 {
            margin-top: 0;
            color: #333333;
            font-size: 22px;
            font-weight: bold;
            text-align: left;
          }
    
          h2 {
            margin-top: 0;
            color: #333333;
            font-size: 16px;
            font-weight: bold;
            text-align: left;
          }
    
          h3 {
            margin-top: 0;
            color: #333333;
            font-size: 14px;
            font-weight: bold;
            text-align: left;
          }
    
          td,
          th {
            font-size: 16px;
          }
    
          p,
          ul,
          ol,
          blockquote {
            margin: 0.4em 0 1.1875em;
            font-size: 16px;
            line-height: 1.625;
          }
    
          p.sub {
            font-size: 13px;
          }
    
          .align-right {
            text-align: right;
          }
    
          .align-left {
            text-align: left;
          }
    
          .align-center {
            text-align: center;
          }
    
          .u-margin-bottom-none {
            margin-bottom: 0;
          }
    
          .button {
            background-color: #3869d4;
            border-top: 10px solid #3869d4;
            border-right: 18px solid #3869d4;
            border-bottom: 10px solid #3869d4;
            border-left: 18px solid #3869d4;
            display: inline-block;
            color: #fff;
            text-decoration: none;
            border-radius: 3px;
            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
            -webkit-text-size-adjust: none;
            box-sizing: border-box;
          }
    
          .button--green {
            background-color: #22bc66;
            border-top: 10px solid #22bc66;
            border-right: 18px solid #22bc66;
            border-bottom: 10px solid #22bc66;
            border-left: 18px solid #22bc66;
          }
    
          .button--red {
            background-color: #ff6136;
            border-top: 10px solid #ff6136;
            border-right: 18px solid #ff6136;
            border-bottom: 10px solid #ff6136;
            border-left: 18px solid #ff6136;
          }
    
          @media only screen and (max-width: 500px) {
            .button {
              width: 100% !important;
              text-align: center !important;
            }
          }
    
          .attributes {
            margin: 0 0 21px;
          }
    
          .attributes_content {
            background-color: #f4f4f7;
            padding: 16px;
          }
    
          .attributes_item {
            padding: 0;
          }
    
          .content-cell {
            padding: 45px;
          }
    
          @media only screen and (max-width: 600px) {
            .email-body_inner,
            .email-footer {
              width: 100% !important;
            }
          }
    
          @media (prefers-color-scheme: dark) {
            body,
            .email-body,
            .email-body_inner,
            .email-content,
            .email-wrapper,
            .email-masthead,
            .email-footer {
              background-color: #333333 !important;
              color: #fff !important;
            }
            p,
            ul,
            ol,
            blockquote,
            h1,
            h2,
            h3,
            span,
            .purchase_item {
              color: #fff !important;
            }
            .attributes_content {
              background-color: #222 !important;
            }
            .email-masthead_name {
              text-shadow: none !important;
            }
          }
    
          :root {
            color-scheme: light dark;
            supported-color-schemes: light dark;
          }
        </style>
      </head>
      <body>
        <span class="preheader">Your account has been created on  BrightPath App. Here are your login credentials.</span>
        <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
          <tr>
            <td align="center">
              <table class="email-content" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                  <td class="email-masthead">
                    <a href="https://prepai.com" class="f-fallback email-masthead_name">
                     BrightPath App
                    </a>
                  </td>
                </tr>
    
                <tr>
                  <td class="email-body" width="570" cellpadding="0" cellspacing="0">
                    <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td class="content-cell">
                          <div class="f-fallback">
                            <h1>Welcome!</h1>
                            <p>
                              Your parent account has been created on Bright Path App too track your child's (${username}) daily emotional checkins. Below are your login credentials:
                            </p>
                            
                            <table class="attributes" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                              <tr>
                                <td class="attributes_content">
                                  <table width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                    <tr>
                                      <td class="attributes_item">
                                        <strong>Email:</strong> ${email}
                                      </td>
                                    </tr>
                                    <tr>
                                      <td class="attributes_item">
                                        <strong>Password:</strong> ${password}
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                            
                            <p>
                              For security reasons, we recommend changing your password after your first login.
                            </p>
  
                            <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                              <tr>
                                <td align="center">
                                  <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                    <tr>
                                      <td align="center">
                                        <a href="${loginUrl}" class="f-fallback button button--green" target="_blank">
                                          Login to your account
                                        </a>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            </table>
                            
                            <p>If you have any questions, feel free to <a href="mailto:mybrightpathapp@gmail.com">contact our support team</a>.</p>
                            <p>Thanks,<br />The BrightPath App team</p>
                            
                            <table class="body-sub" role="presentation">
                              <tr>
                                <td>
                                  <p class="f-fallback sub">
                                    If you're having trouble with the button above, copy and paste the URL below into your web browser.
                                  </p>
                                  <p class="f-fallback sub">
                                    <a href="${loginUrl}">${loginUrl}</a>
                                  </p>
                                </td>
                              </tr>
                            </table>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                      <tr>
                        <td class="content-cell" align="center">
                          <p class="f-fallback sub align-center">
                           BrightPath App
                            <br />1234 Street Rd. <br />Suite 1234
                          </p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `;
