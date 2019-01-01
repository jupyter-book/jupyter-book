---
title: 'Causality and Experiments'
prev_page:
  url: /01/3/subsection/subsectiontwo
  title: 'Subsection Demo 2'
next_page:
  url: /02/1/observation-and-visualization-john-snow-and-the-broad-street-pump
  title: 'John Snow and the Broad Street Pump'
comment: "***PROGRAMMATICALLY GENERATED, DO NOT EDIT. SEE ORIGINAL FILES IN /content***"
---
Causality and Experiments
======================

*"These problems are, and will probably ever remain, among the inscrutable
secrets of nature. They belong to a class of questions radically inaccessible to
the human intelligence."* —The Times of London, September 1849, on how cholera
is contracted and spread

Does the death penalty have a deterrent effect? Is chocolate good for you? What
causes breast cancer?

All of these questions attempt to assign a cause to an effect. A careful
examination of data can help shed light on questions like these. In this section
you will learn some of the fundamental concepts involved in establishing
causality.

Observation is a key to good science. An *observational study* is one in which
scientists make conclusions based on data that they have observed but had no
hand in generating. In data science, many such studies involve observations on a
group of individuals, a factor of interest called a *treatment*, and an
*outcome* measured on each individual.

It is easiest to think of the individuals as people. In a study of whether
chocolate is good for the health, the individuals would indeed be people, the
treatment would be eating chocolate, and the outcome might be a measure of blood
pressure. But individuals in observational studies need not be people. In a
study of whether the death penalty has a deterrent effect, the individuals could
be the 50 states of the union. A state law allowing the death penalty would be
the treatment, and an outcome could be the state’s murder rate.

The fundamental question is whether the treatment has an effect on the outcome.
Any relation between the treatment and the outcome is called an *association*.
If the treatment causes the outcome to occur, then the association is *causal*.
*Causality* is at the heart of all three questions posed at the start of this
section. For example, one of the questions was whether chocolate directly causes
improvements in health, not just whether there there is a relation between
chocolate and health.

The establishment of causality often takes place in two stages. First, an
association is observed. Next, a more careful analysis leads to a decision about
causality.
