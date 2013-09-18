import jinja2
import os
import re
import webapp2

jinja_environment = jinja2.Environment(
        loader=jinja2.FileSystemLoader(
                os.path.join(os.path.dirname(__file__), "templates")))

MAIN_TITLE = "ScribblePic"

class PageHandler(webapp2.RequestHandler):
    def get(self, base_href):
        template_values = {
            "title": base_href if bool(base_href) else MAIN_TITLE,
            "base_href": base_href
        }
        filename = base_href if bool(base_href) else "index"
        try:
            template = jinja_environment.get_template("%s.html" % filename)
        except jinja2.TemplateNotFound:    
            template = jinja_environment.get_template("404.html")

        self.response.out.write(template.render(template_values))

class ImgUploadHandler(webapp2.RequestHandler):
    dataUrlPattern = re.compile('data:image/(png|jpeg);base64,(.*)$')
    def post(self):
        _id = self.request.get('id')
        img = self.request.get('img') #the original image
        trimap = self.request.get('trimap') #the trimap of 3 colours (black=BG, white=FG, grey=rest)
        match = self.dataUrlPattern.match(trimap)

        if match is not None and len(match.groups()) > 1:
            imgb64 = match.group(2)
            #b = base64.b64decode(imgb64)
            #do something with image
            return self.response.out.write(trimap)

app = webapp2.WSGIApplication([
    (r'/upload',                ImgUploadHandler),
    (r'/(.*)/?',                PageHandler),
    ], debug=True)
