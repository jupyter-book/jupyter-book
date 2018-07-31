{% extends 'markdown.tpl' %}

<!-- Add class for input area -->
{% block input %}
{% if cell.source != '' %}
{:.input_area}
```
{%- if 'magics_language' in cell.metadata  -%}
    {{ cell.metadata.magics_language}}
{%- elif 'name' in nb.metadata.get('language_info', {}) -%}
    {{ nb.metadata.language_info.name }}
{%- endif %}
{{ cell.source }}
```
{% endif %}
{% endblock input %}

<!-- Remove indentations for output text  -->
{% block stream %}
{:.output_stream}
```
{{ output.text }}
```
{% endblock stream %}


{% block data_text %}
{:.output_data_text}
```
{{ output.data['text/plain'] }}
```
{% endblock data_text %}


{% block traceback_line  %}
{:.output_traceback_line}
```
{{ line | strip_ansi }}
```
{% endblock traceback_line  %}

{% block data_html %}
<div markdown="0">
{{ output.data['text/html'] }}
</div>
{% endblock data_html %}
