from django.conf.urls import patterns, include, url
from django.views.generic.base import TemplateView
from django.contrib.staticfiles.urls import staticfiles_urlpatterns


# Uncomment the next two lines to enable the admin:
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = patterns('',
    url(r'^$', TemplateView.as_view(template_name='index.html'), name="home"),
    url(r'^about$',
        TemplateView.as_view(template_name='about.html'), name="about"),
)

urlpatterns += patterns('badguys.vulnerable.views',
    url(r'^injection$',
        TemplateView.as_view(template_name='vulnerable/injection/index.html'),
        name="injection"),
    url(r'^injection/sql$', 'sql', name="injection-sql"),
    url(r'^injection/file-access$', 'file_access',
        name="injection-file-access"),
    url(r'^user-profile$', 'user_profile', name='user-profile'),
    url(r'^injection/code-execution$', 'code_execution',
        name="injection-code-execution"),

    url(r'^cross-site-scripting$',
        TemplateView.as_view(template_name='vulnerable/xss/index.html'),
        name="xss"),
    url(r'^cross-site-scripting/path-matching$',
        TemplateView.as_view(template_name='vulnerable/xss/path.html'),
        name="xss-path"),
    url(r'^cross-site-scripting/form-field$',
        TemplateView.as_view(template_name='vulnerable/xss/form.html'),
        name="xss-form"),
    url(r'^cross-site-scripting/query-params$',
        TemplateView.as_view(template_name='vulnerable/xss/query.html'),
        name="xss-query"),

    # url(r'^$', 'badguys_project.views.home', name='home'),
    # url(r'^badguys_project/', include('badguys_project.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    # url(r'^admin/', include(admin.site.urls)),
)

urlpatterns += staticfiles_urlpatterns()
