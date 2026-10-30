// Landing pages for GEO / AEO: one per country and one per core service.
// Each page answers the question a buyer types, in its own words, with local specifics.
const common = {
  files: 'Native CAD files plus a neutral STEP or IGES; STL or 3MF for printing; DXF for laser cutting; PDF or DWG drawings.',
};

const countries = [
  {
    slug: 'cad-design-services-usa', country: 'United States', short: 'USA', code: 'US', hreflang: 'en-US',
    title: 'CAD Design & Reverse Engineering Services for US Businesses | Model Craft 3D',
    h1: 'CAD design services for US machine shops, startups and makers',
    answer: 'Model Craft 3D is a remote CAD studio that builds production-ready 3D models, reverse-engineered parts and 3D-printable files for clients across the United States, with a 24–48 hour turnaround and a flat rate of USD 25 per hour.',
    lede: 'Send a sketch, photo or broken part from anywhere in the US and get back a clean STEP file and ANSI drawing your machinist or print shop can run straight away.',
    local: [
      'Drawings to ASME Y14.5 (ANSI) in inches or millimetres, with GD&T where your shop needs it',
      'Working hours overlap 8 am – 1 pm Eastern (5 am – 10 am Pacific) every weekday for live calls',
      'Prototypes printed through partner 3D printing shops in the USA and shipped domestically',
      'Invoices in USD; quotes within 24 hours; NDA on request',
      'Popular with Amazon and Kickstarter sellers, job shops, ag-equipment and automotive aftermarket builders',
    ],
    useCases: ['Reverse engineering a discontinued OEM part from photos or a scan', 'Converting hand sketches or 2D PDFs into parametric 3D models', 'Print-ready STL/3MF files for FDM, SLA and SLS', 'Sheet metal brackets with flat-pattern DXF for laser cutting', 'Exploded views and renders for Amazon listings and pitch decks'],
    faqs: [
      ['Do you work with clients in the United States?', 'Yes. Most of our clients are in the US. We keep overlapping hours with Eastern and Pacific time, deliver drawings in inch or metric to ASME Y14.5, and invoice in US dollars.'],
      ['How do I send you a part to reverse engineer?', 'Photograph it next to a ruler or calipers from a few angles, or ship it to one of our US partner shops for a 3D scan. We rebuild it as an editable CAD model and flag any dimension we estimated.'],
      ['Can you get the part made in the USA?', 'Yes. Prototypes and small batches are printed through partner shops in the USA and shipped to you; CNC and moulded parts can run through our partners in China with QC photos before dispatch.'],
    ],
  },
  {
    slug: 'cad-design-services-uk', country: 'United Kingdom', short: 'UK', code: 'GB', hreflang: 'en-GB',
    title: 'CAD Design & Reverse Engineering Services UK | Model Craft 3D',
    h1: 'CAD design services for UK engineers, product startups and workshops',
    answer: 'Model Craft 3D provides remote 3D CAD modelling, reverse engineering, 3D-printable models and product renders to clients in the United Kingdom, delivered in 24–48 hours at USD 25 per hour (about £20).',
    lede: 'Full working-hours overlap with the UK, metric drawings to BS 8888, and files your local machine shop or print bureau can use without changes.',
    local: [
      'Drawings to BS 8888 / ISO in millimetres, first-angle projection as UK shops expect',
      'Live on WhatsApp or a call 9 am – 5 pm GMT, Monday to Saturday',
      'Invoices in GBP or USD; quotes within 24 hours; NDA on request',
      'STEP, DXF and STL files ready for UK laser cutters, CNC shops and print bureaus',
      'Manufacturing through partner factories in China with QC photos, or files for your UK supplier',
    ],
    useCases: ['Reverse engineering obsolete machine and vehicle parts', 'Design for 3D printing: enclosures, brackets, jigs and fixtures', 'Sheet metal parts with flat patterns for laser cutting', 'Consumer product concepts and photoreal renders', 'Injection-moulding-ready plastic parts with 2D drawings'],
    faqs: [
      ['Do you work with UK clients?', 'Yes. We keep full UK working hours, produce metric drawings to BS 8888 in first-angle projection, and can invoice in pounds.'],
      ['How much does CAD modelling cost in the UK?', 'Our rate is USD 25 per hour, roughly £20. You receive an hours estimate before any work starts, so the total is known up front.'],
      ['Can you design a part for 3D printing in the UK?', 'Yes. We deliver watertight STL or 3MF files sized for your printer or a UK print bureau, with wall thickness and tolerances set for FDM, SLA or SLS.'],
    ],
  },
  {
    slug: 'cad-design-services-canada', country: 'Canada', short: 'Canada', code: 'CA', hreflang: 'en-CA',
    title: 'CAD Design & Reverse Engineering Services Canada | Model Craft 3D',
    h1: 'CAD design services for Canadian shops, startups and inventors',
    answer: 'Model Craft 3D delivers 3D CAD models, reverse-engineered parts, 3D-printable files and renders to clients across Canada in 24–48 hours, at USD 25 per hour, with drawings in metric or imperial and bilingual title blocks on request.',
    lede: 'From Vancouver to Halifax: send what you have, get back editable CAD and drawings your local fabricator can quote from.',
    local: [
      'Metric or imperial drawings, ASME Y14.5 or ISO, with English/French title blocks when needed',
      'Overlap 8 am – 1 pm Eastern (5 am – 10 am Pacific) every weekday',
      'Invoices in CAD or USD; quotes within 24 hours; NDA on request',
      'Print-ready files for Canadian 3D printing services and CNC shops',
      'Experience with agricultural, automotive aftermarket and outdoor-equipment parts',
    ],
    useCases: ['Reverse engineering farm and heavy-equipment components', 'Replacement parts for discontinued appliances and tools', 'Enclosures for electronics and IoT prototypes', 'Sheet metal and weldment design with DXF flat patterns', 'Product renders for crowdfunding and retail listings'],
    faqs: [
      ['Do you serve clients in Canada?', 'Yes. We work with shops and startups across Canada, deliver in metric or imperial, and can add bilingual title blocks to drawings.'],
      ['Can you invoice in Canadian dollars?', 'Yes. Quotes are given in USD at 25 per hour and can be invoiced in CAD at the day’s rate.'],
      ['How quickly can I get a model?', 'Most single parts and drawings are delivered within 24–48 hours of an approved estimate. Larger assemblies get their own timeline in the quote.'],
    ],
  },
  {
    slug: 'cad-design-services-australia', country: 'Australia', short: 'Australia', code: 'AU', hreflang: 'en-AU',
    title: 'CAD Design & Reverse Engineering Services Australia | Model Craft 3D',
    h1: 'CAD design services for Australian manufacturers, startups and makers',
    answer: 'Model Craft 3D provides remote 3D CAD modelling, reverse engineering, 3D-printable models and renders to Australian clients, delivered in 24–48 hours at USD 25 per hour (about AUD 38), with metric drawings to AS 1100.',
    lede: 'Afternoon and evening overlap with AEST, metric drawings to Australian standards, and files ready for your local laser cutter, CNC shop or print service.',
    local: [
      'Metric drawings to AS 1100 / ISO, third-angle projection as Australian shops expect',
      'Live 2 pm – 10 pm AEST (noon – 8 pm AWST), Monday to Saturday',
      'Invoices in AUD or USD; quotes within 24 hours; NDA on request',
      'STEP, DXF and STL files for Australian fabricators and 3D printing services',
      'Manufacturing through partner factories in China with QC photos before shipping to Australia',
    ],
    useCases: ['Reverse engineering mining, agricultural and 4WD accessory parts', 'Sheet metal brackets, trays and enclosures with DXF flat patterns', 'Design for 3D printing: jigs, fixtures and replacement parts', 'Consumer product development from sketch to render', 'Injection-moulding-ready parts for small production runs'],
    faqs: [
      ['Do you work with Australian clients?', 'Yes. We keep afternoon and evening hours on AEST, draw to AS 1100 in metric, and can invoice in Australian dollars.'],
      ['What does CAD design cost in Australia?', 'USD 25 per hour, about AUD 38 at current rates, with an hours estimate agreed before work starts.'],
      ['Can you arrange manufacturing for Australia?', 'Yes. CNC, moulded and sheet metal parts can be produced through our partner factories in China with QC photos, then shipped to Australia; or we supply files for your local supplier.'],
    ],
  },
];

const services = [
  {
    slug: 'cad-modelling-services', name: 'CAD modelling', title: '3D CAD Modelling Services — Parts, Assemblies & 2D Drawings | Model Craft 3D',
    h1: '3D CAD modelling: parts, mechanical components, assemblies and drawings',
    answer: 'Model Craft 3D builds parametric 3D CAD models of parts, mechanical components and complex assemblies, with 2D technical drawings, delivered as STEP, IGES, DWG and PDF in 24–48 hours at USD 25 per hour.',
    lede: 'Clean feature trees your engineers can edit, dimensioned drawings your shop can build from.',
    points: ['Parametric parts and multi-part assemblies with mates and motion', '2D technical drawings to ASME Y14.5 or ISO with GD&T', 'Design for manufacturing checks: draft, wall thickness, tolerances', 'Bill of materials and exploded views for assembly instructions', 'Outputs: STEP · IGES · DWG · PDF · native CAD'],
    faqs: [
      ['What do I need to send to get a CAD model made?', 'A sketch with dimensions, a photo with a known size in frame, an existing drawing, or a physical part. We confirm the brief, send an hours estimate, and start within a day.'],
      ['Will I be able to edit the model myself?', 'Yes. We model parametrically with clean, named features and deliver the native file alongside STEP, so your team can change dimensions later.'],
      ['How long does a CAD model take?', 'Single parts and drawings in 24–48 hours; assemblies of 10–60 parts typically within a week.'],
    ],
  },
  {
    slug: 'reverse-engineering-services', name: 'Reverse engineering', title: 'Reverse Engineering Services — Photos or Scan to CAD (STEP) | Model Craft 3D',
    h1: 'Reverse engineering: from photos, scans or a physical part to a production-ready CAD model',
    answer: 'Model Craft 3D reverse engineers parts from photographs, 3D scans or measured samples into editable, production-ready CAD models, delivering a STEP file and 2D drawing in 24–48 hours at USD 25 per hour.',
    lede: 'Discontinued parts, worn components and competitor samples rebuilt as clean parametric CAD, with every estimated dimension flagged.',
    points: ['Scan-to-CAD in Geomagic Design X from STL or point-cloud data', 'Photo-to-CAD using a ruler or calipers in frame for scale', 'Parametric rebuild, not a mesh trace, so the part stays editable', 'Design intent restored: fillets, drafts, threads and standard features', 'Outputs: STEP · DWG · native CAD'],
    faqs: [
      ['Can you reverse engineer a part from photos only?', 'Usually yes. Photograph the part from several angles with a ruler or calipers visible, and note any critical dimensions. We rebuild it parametrically and list the dimensions we estimated.'],
      ['What scan formats do you accept?', 'STL, OBJ, PLY and point-cloud exports from any handheld or desktop scanner. We also work from CMM or caliper measurements.'],
      ['Will the file work in my CAD software?', 'Yes. You receive a neutral STEP file that opens in SolidWorks, Fusion 360, Inventor, Onshape, NX and Creo, plus a native file on request.'],
    ],
  },
  {
    slug: '3d-sculpting-services', name: '3D sculpting', title: '3D Sculpting Services — Characters, Busts, Trophies & Art for Printing | Model Craft 3D',
    h1: '3D sculpting for characters, busts, trophies, jewellery and art pieces',
    answer: 'Model Craft 3D sculpts characters, busts, trophies, jewellery and decorative pieces in Blender, delivering watertight ZTL, OBJ and STL files ready for 3D printing or casting, in 48–72 hours at USD 25 per hour.',
    lede: 'From concept art or a reference photo to a print-ready sculpture with supports, keys and hollowing done.',
    points: ['Character and likeness sculpting from reference images', 'Busts, statues, trophies, plaques and commemorative pieces', 'Jewellery and figurine masters prepared for lost-wax casting', 'Hollowed, keyed and split for resin or FDM printing', 'Outputs: ZTL · OBJ · STL · 3MF'],
    faqs: [
      ['Can you sculpt a likeness from photos?', 'Yes. Send front, side and three-quarter photos. We sculpt the likeness, share turntable previews for feedback, and deliver a print-ready file.'],
      ['Will the sculpture print on my printer?', 'Yes. Tell us the printer and material, and we size, hollow, key and orient the model so it prints first time.'],
      ['How long does a sculpture take?', 'Simple trophies and ornaments in about 48 hours; detailed busts and characters in 3–7 days.'],
    ],
  },
  {
    slug: '3d-printing-design-services', name: 'Printable models & enclosures', title: '3D Printing Design Services — Print-Ready STL/3MF Models & PCB Enclosures | Model Craft 3D',
    h1: 'Printable models and PCB enclosures, designed to print first time',
    answer: 'Model Craft 3D designs custom parts, prototypes and PCB enclosures for 3D printing, delivering watertight STL, 3MF and STEP files tuned for FDM, SLA, SLS or MJF in 24–48 hours at USD 25 per hour, with printing available through partner shops in the USA.',
    lede: 'Wall thickness, tolerances, snap fits and supports planned for your exact printer and material.',
    points: ['Custom parts, replacement parts, jigs and fixtures', 'PCB enclosures with standoffs, port cut-outs, vents and snap or screw lids', 'Tolerances set for FDM, SLA, SLS and MJF', 'Prototypes printed through partner shops in the USA and shipped to you', 'Outputs: STL · 3MF · STEP'],
    faqs: [
      ['Can you design an enclosure for my circuit board?', 'Yes. Send the board outline or a photo with dimensions, the connector positions and the mounting hole pattern. We design the enclosure with standoffs, cut-outs and a lid that fits.'],
      ['Do you also print the parts?', 'Yes. We can have prototypes printed through partner shops in the USA and shipped to you, or send you the files to print yourself.'],
      ['What file do I need for 3D printing?', 'STL or 3MF. We supply both, plus a STEP file so the design can be edited later.'],
    ],
  },
  {
    slug: 'sheet-metal-and-injection-moulding-design', name: 'Sheet metal & injection moulding', title: 'Sheet Metal & Injection Moulding Part Design — DXF, STEP, Drawings | Model Craft 3D',
    h1: 'Sheet metal parts and injection-moulding-ready plastic parts',
    answer: 'Model Craft 3D designs sheet metal parts with flat-pattern DXF files for laser cutting, and injection-moulding-ready plastic parts with draft, uniform walls and 2D drawings, delivered as DXF, STEP and PDF in 24–48 hours at USD 25 per hour, with manufacturing available through partner factories in China.',
    lede: 'Parts your fabricator or moulder can quote from on day one, with the manufacturability already checked.',
    points: ['Sheet metal brackets, trays, chassis and enclosures with bend tables and K-factors', 'Flat-pattern DXF for laser, waterjet and punch', 'Moulded parts with draft, ribs, bosses and uniform wall thickness', '2D drawings with critical dimensions and tolerances', 'Manufacturing: CNC, moulding, sheet metal and castings through partners in China with QC photos'],
    faqs: [
      ['Do you supply the DXF flat pattern?', 'Yes. Every sheet metal part ships with a flat-pattern DXF ready for the laser cutter, plus the STEP and a bend drawing.'],
      ['Can you make my plastic part mouldable?', 'Yes. We add draft, even out wall thickness, add ribs and bosses, and remove undercuts or add side actions, then document it in a 2D drawing.'],
      ['Can you also manufacture the parts?', 'Yes. After approval we can run CNC, sheet metal, castings and injection moulding through our partner factories in China, with QC photos before dispatch.'],
    ],
  },
  {
    slug: 'product-rendering-services', name: 'Rendering & animation', title: 'Product Rendering & Animation Services — 4K Renders and MP4 | Model Craft 3D',
    h1: 'Realistic product rendering and animation for prototypes and listings',
    answer: 'Model Craft 3D produces photoreal product renders and animations in KeyShot and Blender from your CAD or ours, delivering 4K PNG stills and MP4 turntables and exploded-view animations in 24–48 hours at USD 25 per hour.',
    lede: 'Studio-quality visuals for Amazon listings, Kickstarter pages, pitch decks and assembly guides, before a single part is made.',
    points: ['Photoreal stills with studio lighting and material libraries', 'Turntables, exploded-view and assembly animations', 'Colour, material and finish variants from one model', 'Transparent-background PNGs for listings and websites', 'Outputs: 4K PNG · MP4 · GLB for web 3D'],
    faqs: [
      ['Can you render from my existing CAD file?', 'Yes. Send STEP, SLDPRT, F3D or OBJ. We set up materials and lighting and return 4K stills or MP4 within 24–48 hours.'],
      ['Do you do exploded-view animations?', 'Yes. Exploded views and assembly animations are delivered as MP4 and as a frame sequence for your website or manual.'],
      ['What resolution do I get?', '4K (3840 × 2160) stills by default, higher on request, and 1080p or 4K MP4 for video.'],
    ],
  },
];

module.exports = { countries, services, common };
