/* CellTiter-Glo demo data, shared by every screen that shows a list.
   ==================================================================
   Loaded through each page's <helmet>, the same way pronect-demo.css is, and
   read off `window.CTG` in the page's own script. Nothing here is state: the
   demo never fakes saving, so no plate map or result the user "creates" is ever
   remembered, and every list shows the same rows wherever you are in the flow.
   That is what makes a plain frozen constant the right shape rather than
   anything cleverer.

   WHY THIS FILE EXISTS, and why it is not a component. The instrument table and
   the plate map list each appear on more than one screen, so the obvious answer
   is a shared dc-import component. dc-import has no slots, so a component has to
   own an entire modal card, and the app home's Read Plate modal renders its tab
   strip ABOVE the same instrument table inside the same card. A component
   therefore cannot drop in there without also swallowing the tabs, the plate map
   list and the whole modal.

   So the markup stays duplicated for now and only the DATA is shared, which is
   the part that actually matters: duplicated markup costs edits, whereas
   duplicated data means a demo audience can see a reader listed Available on one
   screen and Offline on the next, or a plate map that exists in Read Plate and
   not in Open Plate Map. Revisit the component question once workflow #4 has
   shown the third call site.

   Frozen so a page cannot quietly mutate what every other page reads. */

window.CTG = window.CTG || {};

/* Instrument statuses: the four an instrument can be in, with the colour the
   product uses for each.
   ------------------------------------------------------------------
   THREE OF THESE FOUR COLOURS ARE LITERALS ON PURPOSE, and it is worth
   saying why rather than letting a future reader assume laziness.

   The design system has no token for them. It has --status-attention,
   --status-available and --status-offline, but they resolve to different
   values from the ones the product actually renders, and its
   --status-attention carries the comment "was Sol; Sol read as caution,
   the bug being fixed". So the design system deliberately moved
   attention off Sol, and the product independently moved it to blue.
   Two different fixes to the same complaint.

   Cate's call for the demo: match the product for now, with a decision to
   come on whether the demo adopts the design system's answer instead.
   Values supplied by Cate; sampling a screenshot had each of them one off.

   Reading is the exception: #FDB912 is --pn-color-sol-500 (#FDB813) to
   within one, so it uses the token.

   Note the label too. The product says ACTION NEEDED; this demo said
   "Needs Attention", which came from the design system's token name. */
window.CTG.STATUS = Object.freeze({
  available:    Object.freeze({ label: 'Available',     color: 'rgb(76, 205, 131)' }),
  reading:      Object.freeze({ label: 'Reading',       color: 'var(--pn-color-sol-500)' }),
  actionNeeded: Object.freeze({ label: 'Action Needed', color: 'rgb(0, 176, 240)' }),
  offline:      Object.freeze({ label: 'Offline',       color: 'rgb(120, 120, 120)' }),
});

/* The canonical five MyGlo readers, covering all four statuses.
   CellTiter-Glo only runs on MyGlo, so nothing else belongs in an in-app picker,
   even though the dashboard legitimately lists every instrument on the account,
   GloMax included. Serial-style names were rejected as indistinguishable at a
   glance. The reference screenshot showed two QA boxes both Offline with Next
   disabled, which is a dead end; the brief calls for one selectable reader.

   Kept in alphabetical order by name, matching the "Name" sort every list that
   renders this array implies. Cate's 2026-09-14 call: the Instruments tile's
   top row should be whichever instrument is Reading, with the list still
   genuinely alphabetical rather than Reading pinned to the top by a special
   case. The instrument that was 'MyGlo - Screening Lab' was renamed to
   'MyGlo - Analytical Lab' to sort first; see Working Notes for the rename's
   full footprint (ctg-demo-data.js, instrument-details.dc.html, index.dc.html). */
window.CTG.INSTRUMENTS = Object.freeze([
  Object.freeze({ id:'screening',   name:'MyGlo - Analytical Lab',   status:'reading',      statusLabel:window.CTG.STATUS.reading.label,      color:window.CTG.STATUS.reading.color,      selectable:false, note:'This MyGlo is part-way through a read, so it cannot take another plate.' }),
  Object.freeze({ id:'bench4',      name:'MyGlo - Bench 3',          status:'offline',      statusLabel:window.CTG.STATUS.offline.label,      color:window.CTG.STATUS.offline.color,      selectable:false, note:'This MyGlo is offline, so it cannot take a plate.' }),
  Object.freeze({ id:'cellculture', name:'MyGlo - Cell Culture Lab', status:'available',    statusLabel:window.CTG.STATUS.available.label,    color:window.CTG.STATUS.available.color,    selectable:true,  note:'' }),
  Object.freeze({ id:'lab221b',     name:'MyGlo - Lab 221B',         status:'available',    statusLabel:window.CTG.STATUS.available.label,    color:window.CTG.STATUS.available.color,    selectable:true,  note:'' }),
  Object.freeze({ id:'qc',          name:'MyGlo - QC Lab',           status:'actionNeeded', statusLabel:window.CTG.STATUS.actionNeeded.label, color:window.CTG.STATUS.actionNeeded.color, selectable:false, note:'Action is needed on this MyGlo before it can run a read.' }),
]);

/* Plate maps. Names are free-form: the app generates a default, and the user may
   replace it with anything 3 to 80 characters that avoids \ / * ? " < > | [ ].
   The mix here is deliberate. Some keep the generated name untouched, some are
   renamed but left carrying the timestamp, and some are renamed outright. Where a
   name does carry a timestamp, the Date column sits a few minutes later, because
   the name is stamped when the plate map is started and the date when it is saved.

   pm1 IS the demo's own plate, the one the Plate Map Editor loads and the one
   CTG.ANALYSES[0] is the analysis of. It is pinned and sorts first, so a
   presenter opening this list finds the plate on screen at the top rather than
   ten unrelated names. It is itself a renamed-but-kept-timestamp name, so it
   sits in the same group as pm2 to pm5 and the mix is unchanged. */
window.CTG.PLATE_MAPS = Object.freeze([
  Object.freeze({ id:'pm1', pinned:true,  name:'CTG ATP Std DR 2 Comp 2026 09 08 09:12:30 AM - Plate',      date:'2026-09-08 09:15:04 AM' }),
  Object.freeze({ id:'pm2', pinned:true,  name:'Compound panel dose response 3-fold 2026 09 05 02:44:10 PM - Plate',    date:'2026-09-05 02:47:22 PM' }),
  Object.freeze({ id:'pm3', pinned:false, name:'Cytotoxicity screen plate 1 2026 09 02 11:03:57 AM - Plate',            date:'2026-09-02 11:06:35 AM' }),
  Object.freeze({ id:'pm4', pinned:false, name:'HepG2 viability 10-point 2026 08 27 03:21:48 PM - Plate',               date:'2026-08-27 03:25:09 PM' }),
  Object.freeze({ id:'pm5', pinned:false, name:'Cell titration linearity 2-fold 2026 08 20 10:38:12 AM - Plate',        date:'2026-08-20 10:41:30 AM' }),
  Object.freeze({ id:'pm6', pinned:false, name:'Vehicle control layout',                                                date:'2026-09-09 04:52:18 PM' }),
  Object.freeze({ id:'pm7', pinned:false, name:'CellTiter-Glo 2026 09 09 01:15:21 PM - Plate',                          date:'2026-09-09 01:17:44 PM' }),
  Object.freeze({ id:'pm8', pinned:false, name:'Staurosporine dose response test',                                      date:'2026-09-03 12:09:41 PM' }),
  Object.freeze({ id:'pm9', pinned:false, name:'CellTiter-Glo 2026 09 03 08:47:52 AM - Plate',                          date:'2026-09-03 08:50:16 AM' }),
  Object.freeze({ id:'pm10',pinned:false, name:'CellTiter-Glo 2026 08 25 05:33:06 PM - Plate',                          date:'2026-08-25 05:36:29 PM' }),
]);

/* Row actions on a plate map. Every one is a demo note, which is consistent with
   the demo never faking persistence: there is nothing to rename, delete or pin.
   NOTE COPY IS PENDING the demo's voice and tone guidelines. */
window.CTG.PLATE_MAP_ROW_ACTIONS = Object.freeze([
  Object.freeze({ key:'rename',   note:'Rename changes the name of a plate map in your account. Not wired up in this demo.',    path:'M4 6h11M4 11h7M4 16h7M14 19l5-5 2 2-5 5h-2z' }),
  Object.freeze({ key:'delete',   note:'Delete removes a plate map from your account. Not wired up in this demo.',    path:'M4 7h16M10 7V5h4v2M6 7l1 13h10l1-13' }),
  Object.freeze({ key:'download', note:'Download saves a copy of the plate map to your computer. Not wired up in this demo.', path:'M12 4v11M8 12l4 4 4-4M5 20h14' }),
  Object.freeze({ key:'edit',     note:'Edit opens the plate map in the plate map editor. Not wired up in this demo.',     path:'M4 20h4L19 9l-4-4L4 16z' }),
  Object.freeze({ key:'pin',      note:'Pin keeps a plate map at the top of the list. Not wired up in this demo.',                 path:'M10 3h4l-.6 5.4 3.6 3.2V14h-4.5v6l-.5 1-.5-1v-6H7v-2.4l3.6-3.2z' }),
]);

/* Analyses, one per plate map, in the same order as PLATE_MAPS.
   ------------------------------------------------------------------
   Derived from the plate map names rather than invented separately, so
   the two lists visibly describe one set of experiments: a presenter can
   open Plate Maps and Analysis Results and point at the same work twice.
   an1 is the demo's own, the analysis ctg-analysis-results renders.

   Three rules, applied per row:

   1. A plate map that was renamed but kept its timestamp passes its base
      name through, with a later stamp and "- Analysis" instead of
      "- Plate".
   2. A plate map still carrying its generated name, and a plate map
      renamed outright, both get a GENERATED analysis name. Renaming the
      plate map says nothing about whether the user also renamed the
      analysis, and leaving these generated preserves the deliberate mix
      of naming styles the list is there to show.
   3. Pinned state is inherited from the plate map.

   Timestamps follow the two-instants rule. The analysis name is stamped
   roughly half an hour after the plate map's, long enough to build the
   plate, save it and run the read, and its own saved date lands 2 to 5
   minutes after that. */
window.CTG.ANALYSES = Object.freeze([
  Object.freeze({ id:'an1',  pinned:true,  name:'CTG ATP Std DR 2 Comp 2026 09 08 09:42:19 AM - Analysis',            date:'2026-09-08 09:45:37 AM' }),
  Object.freeze({ id:'an2',  pinned:true,  name:'Compound panel dose response 3-fold 2026 09 05 03:19:48 PM - Analysis', date:'2026-09-05 03:23:05 PM' }),
  Object.freeze({ id:'an3',  pinned:false, name:'Cytotoxicity screen plate 1 2026 09 02 11:38:14 AM - Analysis',      date:'2026-09-02 11:41:36 AM' }),
  Object.freeze({ id:'an4',  pinned:false, name:'HepG2 viability 10-point 2026 08 27 04:01:33 PM - Analysis',         date:'2026-08-27 04:04:52 PM' }),
  Object.freeze({ id:'an5',  pinned:false, name:'Cell titration linearity 2-fold 2026 08 20 11:14:06 AM - Analysis',  date:'2026-08-20 11:17:28 AM' }),
  Object.freeze({ id:'an6',  pinned:false, name:'CellTiter-Glo 2026 09 09 05:28:41 PM - Analysis',                    date:'2026-09-09 05:31:09 PM' }),
  Object.freeze({ id:'an7',  pinned:false, name:'CellTiter-Glo 2026 09 09 01:53:10 PM - Analysis',                    date:'2026-09-09 01:56:33 PM' }),
  Object.freeze({ id:'an8',  pinned:false, name:'CellTiter-Glo 2026 09 03 12:46:05 PM - Analysis',                    date:'2026-09-03 12:49:22 PM' }),
  Object.freeze({ id:'an9',  pinned:false, name:'CellTiter-Glo 2026 09 03 09:25:38 AM - Analysis',                    date:'2026-09-03 09:28:51 AM' }),
  Object.freeze({ id:'an10', pinned:false, name:'CellTiter-Glo 2026 08 25 06:11:44 PM - Analysis',                    date:'2026-08-25 06:15:02 PM' }),
]);

/* Instrument data files: what a read produces, before anything analyses it.
   ------------------------------------------------------------------
   Third list in the set, after plate maps and analyses, and the one the
   Analyze Data modal pairs with a plate map to produce an analysis.

   Fewer row actions than the others, per 131 and the Brain Dump: Rename,
   Download and Pin, with no Delete and no Edit. You do not edit a
   machine's output.

   idf1 is the demo's own read: the one whose RLUs drive ctg-read-results
   and, once analysed, ctg-analysis-results. Its stamp sits between the
   plate map that set it up and the analysis that came out, so the whole
   golden path reads as one sitting:

     plate map  named 09:12:30, saved 09:15:04
     read       named 09:31:07, saved 09:33:52
     analysis   named 09:42:19, saved 09:45:37

   The rest carry the same deliberate mix of generated and renamed names
   the other two lists have. Instrument is recorded so the dashboard's My
   Data can show it; there the column is Instrument rather than
   Application. */
window.CTG.INSTRUMENT_DATA = Object.freeze([
  Object.freeze({ id:'idf1', type:'Full Plate',  pinned:true,  instrument:'MyGlo - Cell Culture Lab', name:'CellTiter-Glo 2026 09 08 09:31:07 AM - Full Plate', date:'2026-09-08 09:33:52 AM' }),
  Object.freeze({ id:'idf2', type:'Endpoint',  pinned:true,  instrument:'MyGlo - Analytical Lab',    name:'ATP-2B-360-05222026',                                date:'2026-09-05 03:57:48 PM' }),
  Object.freeze({ id:'idf3', type:'Full Plate',  pinned:true,  instrument:'MyGlo - Cell Culture Lab', name:'CellTiter-Glo 2026 09 05 02:58:31 PM - Full Plate',  date:'2026-09-05 03:01:14 PM' }),
  Object.freeze({ id:'idf4', type:'Analysis',  pinned:true,  instrument:'MyGlo - QC Lab',           name:'Cytotox screen plate 1 rerun',                       date:'2026-09-02 11:22:09 AM' }),
  Object.freeze({ id:'idf5', type:'Full Plate',  pinned:true,  instrument:'MyGlo - Cell Culture Lab', name:'CellTiter-Glo 2026 09 02 11:18:44 AM - Full Plate',  date:'2026-09-02 11:21:26 AM' }),
  Object.freeze({ id:'idf6', type:'Analysis',  pinned:true,  instrument:'MyGlo - Bench 3',          name:'ATP-1A-360-05222026',                                date:'2026-08-27 03:52:51 PM' }),
  Object.freeze({ id:'idf7', type:'Full Plate',  pinned:false, instrument:'MyGlo - Cell Culture Lab', name:'CellTiter-Glo 2026 08 27 03:38:15 PM - Full Plate',  date:'2026-08-27 03:41:02 PM' }),
  Object.freeze({ id:'idf8', type:'Time Course',  pinned:false, instrument:'MyGlo - Analytical Lab',    name:'HepG2 viability rerun 2',                            date:'2026-08-27 02:14:37 PM' }),
  Object.freeze({ id:'idf9', type:'Full Plate',  pinned:false, instrument:'MyGlo - Cell Culture Lab', name:'CellTiter-Glo 2026 08 20 10:55:03 AM - Full Plate',  date:'2026-08-20 10:57:48 AM' }),
  Object.freeze({ id:'idf10', type:'Full Plate', pinned:false, instrument:'MyGlo - Bench 3',          name:'CellTiter-Glo 2026 08 25 05:48:22 PM - Full Plate',  date:'2026-08-25 05:51:09 PM' }),
]);

/* Row actions for an instrument data file. No Delete and no Edit; see above. */
window.CTG.INSTRUMENT_DATA_ROW_ACTIONS = Object.freeze(
  window.CTG.PLATE_MAP_ROW_ACTIONS.filter(a => a.key === 'rename' || a.key === 'download' || a.key === 'pin')
);

/* Row actions for an analysis. No Edit: an analysis is output, not a document
   you go back and change. Per 125. */
window.CTG.ANALYSIS_ROW_ACTIONS = Object.freeze(
  window.CTG.PLATE_MAP_ROW_ACTIONS.filter(a => a.key !== 'edit')
);

/* The other apps' files, padding each My Data list to a realistic length.
   ------------------------------------------------------------------
   The dashboard lists every app; an in-app list filters to one. So these
   exist only so the dashboard's three lists are long enough for
   pagination to mean something, per Cate: about 25 rows each, 10 to a
   page. The CellTiter-Glo rows above stay the coherent set that the
   demo's own story runs through.

   Generated once with a fixed seed and pasted in as literals rather than
   generated at load, so the demo shows the same rows every time. They
   carry the same deliberate mix of naming styles as the real rows:
   generated defaults, renamed but keeping the timestamp, and renamed
   outright. Nothing links to them; they are list furniture. */
window.CTG.OTHER_ANALYSES = Object.freeze([
  Object.freeze({ name:'TPD Kinetic 2026 08 31 11:30:55 PM - Analysis', app:'TPD Kinetic', date:'2026-08-31 11:34:33 PM', pinned:true }),
  Object.freeze({ name:'Staurosporine positive control', app:'Caspase-Glo 3/7', date:'2026-08-29 01:26:10 AM', pinned:false }),
  Object.freeze({ name:'ATP linearity 2-fold', app:'BacTiter-Glo', date:'2026-08-28 02:49:32 AM', pinned:false }),
  Object.freeze({ name:'Caspase-Glo 3/7 2026 08 13 1:57:42 AM - Analysis', app:'Caspase-Glo 3/7', date:'2026-08-13 02:03:19 AM', pinned:false }),
  Object.freeze({ name:'Biofilm viability check 2026 08 10 7:28:32 AM - Analysis', app:'BacTiter-Glo', date:'2026-08-10 07:31:14 AM', pinned:false }),
  Object.freeze({ name:'LDH-Glo 2026 08 07 12:00:09 AM - Analysis', app:'LDH-Glo', date:'2026-08-07 12:05:15 AM', pinned:true }),
  Object.freeze({ name:'TPD time course plate 5 2026 08 06 3:41:18 AM - Analysis', app:'TPD Kinetic', date:'2026-08-06 03:43:32 AM', pinned:true }),
  Object.freeze({ name:'Cytotox LDH unit test', app:'LDH-Glo', date:'2026-08-06 02:34:05 AM', pinned:false }),
  Object.freeze({ name:'BacTiter-Glo 2026 08 04 3:49:13 AM - Analysis', app:'BacTiter-Glo', date:'2026-08-04 03:53:59 AM', pinned:true }),
  Object.freeze({ name:'Apoptosis dose response', app:'Caspase-Glo 3/7', date:'2026-07-26 04:33:08 AM', pinned:false }),
  Object.freeze({ name:'TPD degradation 6h', app:'TPD Kinetic', date:'2026-07-14 05:26:32 AM', pinned:false }),
  Object.freeze({ name:'LDH-Glo 2026 07 11 2:55:55 AM - Analysis', app:'LDH-Glo', date:'2026-07-11 02:59:07 AM', pinned:false }),
  Object.freeze({ name:'BacTiter-Glo 2026 07 09 12:53:30 AM - Analysis', app:'BacTiter-Glo', date:'2026-07-09 12:58:34 AM', pinned:false }),
  Object.freeze({ name:'Degrader panel kinetic 2026 07 03 5:19:48 AM - Analysis', app:'TPD Kinetic', date:'2026-07-03 05:23:59 AM', pinned:false }),
  Object.freeze({ name:'Caspase-Glo 3/7 2026 07 02 4:53:11 AM - Analysis', app:'Caspase-Glo 3/7', date:'2026-07-02 04:55:54 AM', pinned:false }),
  Object.freeze({ name:'LDH release timecourse 2026 06 29 8:15:13 AM - Analysis', app:'LDH-Glo', date:'2026-06-29 08:18:09 AM', pinned:false }),
]);

window.CTG.OTHER_PLATE_MAPS = Object.freeze([
  Object.freeze({ name:'LDH-Glo 2026 08 29 11:54:09 PM - Plate', app:'LDH-Glo', date:'2026-08-30 12:00:02 AM', pinned:false }),
  Object.freeze({ name:'Apoptosis dose response 2026 08 30 5:04:21 AM - Plate', app:'Caspase-Glo 3/7', date:'2026-08-30 05:09:45 AM', pinned:false }),
  Object.freeze({ name:'Cytotox LDH unit test', app:'LDH-Glo', date:'2026-08-15 02:17:22 AM', pinned:false }),
  Object.freeze({ name:'Membrane integrity rerun', app:'LDH-Glo', date:'2026-08-14 06:21:00 AM', pinned:false }),
  Object.freeze({ name:'TPD Kinetic 2026 08 10 6:12:33 AM - Plate', app:'TPD Kinetic', date:'2026-08-10 06:15:07 AM', pinned:false }),
  Object.freeze({ name:'Caspase 3/7 v4 2026 08 02 6:43:32 AM - Plate', app:'Caspase-Glo 3/7', date:'2026-08-02 06:47:13 AM', pinned:false }),
  Object.freeze({ name:'LDH release timecourse 2026 08 01 5:58:04 AM - Plate', app:'LDH-Glo', date:'2026-08-01 06:01:21 AM', pinned:false }),
  Object.freeze({ name:'Degrader panel kinetic', app:'TPD Kinetic', date:'2026-08-01 03:53:17 AM', pinned:false }),
  Object.freeze({ name:'TPD Kinetic 2026 07 29 11:51:30 PM - Plate', app:'TPD Kinetic', date:'2026-07-29 11:53:59 PM', pinned:false }),
  Object.freeze({ name:'TPD Kinetic 2026 07 20 8:29:40 AM - Plate', app:'TPD Kinetic', date:'2026-07-20 08:34:05 AM', pinned:false }),
  Object.freeze({ name:'BacTiter-Glo 2026 07 19 4:18:24 AM - Plate', app:'BacTiter-Glo', date:'2026-07-19 04:22:32 AM', pinned:false }),
  Object.freeze({ name:'ATP linearity 2-fold', app:'BacTiter-Glo', date:'2026-07-18 06:40:01 AM', pinned:false }),
  Object.freeze({ name:'BacTiter-Glo 2026 07 17 5:57:26 AM - Plate', app:'BacTiter-Glo', date:'2026-07-17 06:02:46 AM', pinned:false }),
  Object.freeze({ name:'Staurosporine positive control 2026 07 17 5:05:26 AM - Plate', app:'Caspase-Glo 3/7', date:'2026-07-17 05:09:39 AM', pinned:false }),
  Object.freeze({ name:'ATP linearity 2-fold 2026 07 09 4:36:15 AM - Plate', app:'BacTiter-Glo', date:'2026-07-09 04:40:03 AM', pinned:false }),
  Object.freeze({ name:'Apoptosis dose response 2026 07 02 12:46:33 AM - Plate', app:'Caspase-Glo 3/7', date:'2026-07-02 12:48:37 AM', pinned:false }),
]);

window.CTG.OTHER_INSTRUMENT_DATA = Object.freeze([
  Object.freeze({ name:'BacTiter-Glo 2026 09 04 2:24:34 AM', app:'BacTiter-Glo', type:'Time Course', instrument:'MyGlo - Cell Culture Lab', date:'2026-09-04 02:27:57 AM', pinned:false }),
  Object.freeze({ name:'LDH-Glo 2026 09 03 6:50:08 AM', app:'LDH-Glo', type:'Analysis', instrument:'MyGlo - Cell Culture Lab', date:'2026-09-03 06:54:52 AM', pinned:false }),
  Object.freeze({ name:'TPD degradation 6h 2026 09 01 3:19:18 AM', app:'TPD Kinetic', type:'Time Course', instrument:'MyGlo - Cell Culture Lab', date:'2026-09-01 03:22:26 AM', pinned:true }),
  Object.freeze({ name:'LDH release timecourse', app:'LDH-Glo', type:'Time Course', instrument:'MyGlo - Analytical Lab', date:'2026-08-31 11:32:02 PM', pinned:false }),
  Object.freeze({ name:'Caspase-Glo 3/7 2026 08 29 7:35:38 AM', app:'Caspase-Glo 3/7', type:'Time Course', instrument:'MyGlo - QC Lab', date:'2026-08-29 07:38:22 AM', pinned:false }),
  Object.freeze({ name:'ATP linearity 2-fold 2026 08 26 6:41:47 AM', app:'BacTiter-Glo', type:'Time Course', instrument:'MyGlo - Cell Culture Lab', date:'2026-08-26 06:45:43 AM', pinned:true }),
  Object.freeze({ name:'Apoptosis dose response', app:'Caspase-Glo 3/7', type:'Endpoint', instrument:'MyGlo - Cell Culture Lab', date:'2026-08-23 12:44:33 AM', pinned:false }),
  Object.freeze({ name:'Caspase-Glo 3/7 2026 08 22 3:04:27 AM', app:'Caspase-Glo 3/7', type:'Full Plate', instrument:'MyGlo - Analytical Lab', date:'2026-08-22 03:09:35 AM', pinned:false }),
  Object.freeze({ name:'TPD time course plate 5', app:'TPD Kinetic', type:'Full Plate', instrument:'MyGlo - Cell Culture Lab', date:'2026-08-20 07:42:04 AM', pinned:false }),
  Object.freeze({ name:'TPD Kinetic 2026 08 13 8:23:28 AM', app:'TPD Kinetic', type:'Analysis', instrument:'MyGlo - Bench 3', date:'2026-08-13 08:27:19 AM', pinned:false }),
  Object.freeze({ name:'BacTiter-Glo 2026 08 13 3:29:21 AM', app:'BacTiter-Glo', type:'Endpoint', instrument:'MyGlo - QC Lab', date:'2026-08-13 03:33:57 AM', pinned:false }),
  Object.freeze({ name:'TPD Kinetic 2026 08 12 6:39:40 AM', app:'TPD Kinetic', type:'Endpoint', instrument:'MyGlo - QC Lab', date:'2026-08-12 06:41:58 AM', pinned:false }),
  Object.freeze({ name:'Caspase-Glo 3/7 2026 08 06 1:25:47 AM', app:'Caspase-Glo 3/7', type:'Time Course', instrument:'MyGlo - QC Lab', date:'2026-08-06 01:31:38 AM', pinned:false }),
  Object.freeze({ name:'LDH-Glo 2026 07 28 5:00:40 AM', app:'LDH-Glo', type:'Analysis', instrument:'MyGlo - Analytical Lab', date:'2026-07-28 05:04:49 AM', pinned:false }),
  Object.freeze({ name:'BacTiter-Glo 2026 07 05 5:11:58 AM', app:'BacTiter-Glo', type:'Time Course', instrument:'MyGlo - Bench 3', date:'2026-07-05 05:16:48 AM', pinned:false }),
  Object.freeze({ name:'Cytotox LDH unit test', app:'LDH-Glo', type:'Time Course', instrument:'MyGlo - QC Lab', date:'2026-07-02 06:41:23 AM', pinned:false }),
]);
