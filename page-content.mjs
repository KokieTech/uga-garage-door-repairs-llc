export const services = {
  'broken-springs': {
    label: 'Broken springs',
    heading: 'Broken Garage Door Spring Replacement',
    description: 'Get help with a heavy or stuck garage door. UGA checks door balance and replaces broken springs in Huntley and Northern Illinois.',
    intro: 'If you heard a bang in the garage and the door now barely lifts, a spring may have broken. The springs counterbalance the weight of the door, so a failure can leave even a working opener unable to lift it.',
    symptoms: ['The door feels suddenly heavy or stops a few inches above the floor.', 'There is a visible gap in the coil above the door.', 'The opener strains or the door drops faster than usual.'],
    work: 'We inspect the spring system and related hardware, match replacement springs to the door, and check balance and travel after installation.',
    photo: ['broken-torsion-spring.webp', 'Gap in a broken garage door torsion spring coil', 'A separated torsion spring coil is one sign of spring failure.'],
    towns: ['huntley-il', 'crystal-lake-il', 'lake-in-the-hills-il']
  },
  'cables-and-off-track': {
    label: 'Cables',
    heading: 'Garage Door Cable & Off-Track Repair',
    description: 'Call UGA for frayed lift cables, crooked garage doors, or rollers out of their tracks in Huntley and Northern Illinois.',
    intro: 'A door that hangs crooked or binds partway through travel may have a lift cable, roller, or track problem. Forcing it through another cycle can bend the track or damage a panel.',
    symptoms: ['One side of the door sits higher than the other.', 'A lift cable is frayed, slack, or off its drum.', 'A roller has come out of its track or the door scrapes as it moves.'],
    work: 'We check the cables, drums, rollers, and track alignment to find what caused the door to shift. We explain which parts need attention and check that both sides travel evenly after repair.',
    photo: ['lift-cable-detail.webp', 'Garage door lift cable and cable drum near the overhead track', 'The cable and drum help keep each side of the door lifting evenly.'],
    towns: ['huntley-il', 'algonquin-il', 'elgin-il']
  },
  'new-opener-installation': {
    label: 'New opener installation',
    heading: 'New Garage Door Opener Installation',
    description: 'Install or replace a garage door opener in Huntley or Northern Illinois with help setting up remotes, keypads, and compatible smart apps.',
    intro: 'A new opener can make the garage easier to use when you come home, let someone in, or need a keypad the whole household can share. We help you choose an opener that fits the door and the controls you plan to use.',
    symptoms: ['The motor runs intermittently or frequently stops responding.', 'You want quieter operation near a living area.', 'You need a first opener, a wireless keypad, or compatible phone controls.'],
    work: 'We check the door and mounting space, install the opener, and test travel, safety sensors, and reversal. We can pair remotes and keypads and help connect a supported smart app.',
    photo: ['opener.webp', 'Ceiling-mounted garage door opener with its overhead rail', 'The opener, rail, and controls need to suit the door and available space.'],
    towns: ['huntley-il', 'algonquin-il', 'lake-in-the-hills-il']
  },
  'new-door-installation': {
    label: 'New door installation',
    heading: 'New Garage Door Installation',
    description: 'Plan a garage door replacement in Huntley or Northern Illinois. Compare door styles, windows, and insulation with UGA and request an estimate.',
    intro: 'A replacement door can address damaged panels, gaps at the floor, or a finish that no longer suits the house. Start with how you use the garage, then consider insulation, window placement, and the look of the exterior.',
    symptoms: ['Several sections are damaged or deteriorating.', 'You want a door with different insulation, windows, or finish.', 'You are finishing a garage or replacing a door and its hardware.'],
    work: 'We confirm the opening size and clearances, discuss door options and opener compatibility, and check fit, seal, and operation once the door is installed.',
    photo: ['gallery/wood-after.webp', 'Finished wood-grain garage doors with vertical rows of windows', 'UGA gallery example of a wood-grain finish with vertical window rows.'],
    towns: ['huntley-il', 'crystal-lake-il', 'elgin-il']
  }
};

export const towns = {
  'huntley-il': {
    name: 'Huntley',
    description: 'Huntley-based UGA helps with broken garage door springs, sticking doors, and replacements. Call 24/7 to confirm availability in Huntley, IL.',
    intro: 'When a door stops lifting and the car is still inside, tell us where the door stopped and whether it looks level. UGA is based in Huntley and helps local homeowners work out the next step for a stuck door or planned replacement.',
    issues: ['A sudden bang followed by a door that barely lifts can point to a failed spring.', 'A crooked door or loose cable should stay put until it is inspected.', 'If panels are damaged in several places, ask about repair and replacement options.'],
    photo: ['gallery/black-interior.webp', 'Torsion springs and tracks above a sectional garage door', 'This gallery photo shows the spring and track hardware we check when a garage door becomes hard to lift.'],
    services: ['broken-springs', 'cables-and-off-track', 'new-door-installation']
  },
  'crystal-lake-il': {
    name: 'Crystal Lake',
    description: 'Request garage door repair or replacement in Crystal Lake, IL. UGA can help compare door styles, insulation, and spring repair options.',
    intro: 'For homeowners in Crystal Lake and nearby McHenry County communities, a garage door replacement is a chance to rethink how the garage fits the house. Consider where windows would bring in light and whether insulation matters for the way you use the space.',
    issues: ['Daylight under the closed door can indicate an uneven seal or a fit issue.', 'Dents across multiple sections can make a replacement worth discussing.', 'A door that suddenly feels heavier may need spring service even when the panels are in good condition.'],
    photo: ['gallery/white-after.webp', 'White sectional garage door with arched windows', 'This arched-window installation from the gallery shows one way to add daylight while keeping the lower panels solid.'],
    services: ['new-door-installation', 'broken-springs']
  },
  'algonquin-il': {
    name: 'Algonquin',
    description: 'Get help with garage door openers, keypads, remotes, and off-track doors in Algonquin, IL. Request an estimate from Huntley-based UGA.',
    intro: 'If your Algonquin garage is the entrance your household uses most, reliable controls matter. Tell us whether the wall button, remote, or keypad stopped working, or whether you want to replace an older opener with one everyone can use.',
    issues: ['A keypad that fails while the wall button works may point to an access-control issue.', 'A door that reverses at the floor may need a sensor or travel check.', 'If the door tilts or binds, the cables or tracks may need attention before opener work.'],
    photo: ['gallery/wood-after.webp', 'Wood-grain sectional garage doors with vertical window rows', 'See these finished doors in motion in the gallery if you are planning an opener or door upgrade.'],
    services: ['new-opener-installation', 'cables-and-off-track']
  },
  'lake-in-the-hills-il': {
    name: 'Lake in the Hills',
    description: 'Ask UGA about noisy garage doors, spring problems, and opener replacement in Lake in the Hills, IL. Call 24/7 to confirm availability.',
    intro: 'A noisy garage door can be disruptive when the garage shares a wall or ceiling with a living space. For Lake in the Hills homeowners, we start by finding out whether the sound comes from the moving door or from the opener itself.',
    issues: ['Scraping on one side can point to a roller or track problem.', 'An opener that sounds strained may be working against an unbalanced door.', 'Rattling throughout travel is worth describing when you request an estimate.'],
    photo: ['gallery/door-raised.webp', 'Raised sectional garage door and overhead tracks inside a workshop', 'This interior view shows the overhead track that guides the rollers as the door opens.'],
    services: ['new-opener-installation', 'broken-springs', 'cables-and-off-track']
  },
  'elgin-il': {
    name: 'Elgin',
    description: 'Plan garage door repair or installation in Elgin, IL. UGA helps with damaged lift cables, uneven doors, and replacements for existing openings.',
    intro: 'For an Elgin home or detached garage, the existing opening often shapes the installation. If you are replacing an older door, we can check the space above the opening and along the sides before discussing panels, tracks, or hardware.',
    issues: ['A door that rubs against one jamb may have moved out of alignment.', 'Frayed cables or uneven lifting need attention before the door is used again.', 'Limited overhead clearance can affect track choices for a replacement.'],
    photo: ['gallery/red-garage.webp', 'White raised-panel garage door framed by red siding', 'This gallery example shows a raised-panel option for a stand-alone garage.'],
    services: ['cables-and-off-track', 'new-door-installation']
  }
};
