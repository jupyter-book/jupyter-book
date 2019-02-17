{% extends 'markdown.tpl' %}

<!-- Add class for input area -->
{% block input %}
{% if cell.source != '' %}
{:.input_area{% if 'hidecode' in cell.metadata.tags %} .hidecode{% endif %}}
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
{:.output .output_stream}
```
{{ output.text }}
```
{% endblock stream %}


{% block data_text %}
{:.output .output_data_text}
```
{{ output.data['text/plain'] }}
```
{% endblock data_text %}


{% block error  %}
{:.output .output_traceback_line}
```
{{- super() }}
```
{% endblock error  %}

{% block data_html %}
<div markdown="0" class="output output_html">
{{ output.data['text/html'] }}
</div>
{% endblock data_html %}

{% block data_png %}
{:.output .output_png}
{{- super() }}
{% endblock data_png %}