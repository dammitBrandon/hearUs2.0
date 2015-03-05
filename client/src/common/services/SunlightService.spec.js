describe('Service: sunlightService', function () {
  var sunlightService, $httpBackend;
  var baseUrl = '/api/sunlight/';

  beforeEach(module("hearUs"));
  beforeEach(inject(function (_sunlightService_, _$httpBackend_) {
    sunlightService = _sunlightService_;
    $httpBackend = _$httpBackend_;
  }));

  // error if any $http requests were made but not expected or made before the flush()
  afterEach(function () {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
  
  it('creates a sunlightService instance', function () {
    expect(sunlightService).toBeDefined();
  });

  describe('#getIssues', function () {
    var topic = 'gun control';
    var mockTopicResponse = {
      "results": [
        {
          "last_vote_at": null,
          "short_title": "Firearm Safety and Public Health Research Act of 2013",
          "keywords": [
            "Appropriations",
            "Crime and law enforcement",
            "Firearms and explosives",
            "Health programs administration and funding",
            "Medical research",
            "Research administration and funding",
            "Violent crime"
          ],
          "popular_title": null,
          "official_title": "To amend the Continuing Appropriations Resolution, 2013 (Public Law 112-175) to permit research on firearms safety and gun violence.",
          "bill_id": "hr321-113",
          "introduced_on": "2013-01-18",
          "summary_short": "Firearm Safety and Public Health Research Act of 2013 - Makes prohibitions under the Consolidated Appropriations Act, 2012, against the use of funds to advocate or promote gun control inapplicable to amounts made available by the Continuing Appropriations Resolution, 2013, insofar as such prohibitions relate to any activity to conduct research on firearms safety or gun violence.",
          "search": {
            "score": 0.861963,
            "type": "bill"
          }
        },
        {
          "last_vote_at": null,
          "short_title": "Gun Violence Prevention and Reduction Act of 2013",
          "keywords": [
            "Aging",
            "Child health",
            "Crime and law enforcement",
            "Disability and health-based discrimination",
            "Drug, alcohol, tobacco use",
            "Education programs funding",
            "Emergency medical services and trauma care",
            "Employee benefits and pensions",
            "Firearms and explosives",
            "Government studies and investigations",
            "Health care costs and insurance",
            "Health care coverage and access",
            "Health information and medical records",
            "Health personnel",
            "Health programs administration and funding",
            "Higher education",
            "Marketing and advertising",
            "Medical education",
            "Medical research",
            "Mental health",
            "Research administration and funding",
            "Right of privacy",
            "Student aid and college costs",
            "Teaching, teachers, curricula",
            "Violent crime"
          ],
          "popular_title": null,
          "official_title": "To protect American children and their families from the epidemic of gun violence by banning access to certain weapons, strengthening the Nation's mental health infrastructure, and improving the understanding of gun violence.",
          "bill_id": "hr2910-113",
          "introduced_on": "2013-08-01",
          "summary_short": "Gun Violence Prevention and Reduction Act of 2013 - Considers as a banned hazardous product under the Consumer Product Safety Act any firearm receiver casting or firearm receiver blank (do-it-yourself assault weapon) that: (1) at the point of sale does not meet the definition of a firearm under the federal criminal code; and (2) after purchase can be completed by the consumer to the point at which such casting or blank functions as a firearm frame or receiver for a semiautomatic assault weapon or machine gun.\n\nMakes it unlawful to sell, offer for sale, manufacture for sale, or import into the United States for sale, to a consumer an assault weapon parts kit or machine gun parts kit.\n\nMakes it unlawful to market or advertise any of these weapons for sale on any medium of electronic communications, including over the Internet.\n\nAmends the Public Health Service Act to require the Director of the National Institute of Mental Health to conduct or support research on the causes, prevention, a...",
          "search": {
            "score": 0.21549074,
            "type": "bill"
          }
        }
      ],
      "count": 17,
      "page": {
        "count": 17,
        "per_page": 20,
        "page": 1
      },
      "status": "success"
    };
    
    it('exists', function(){
      expect(angular.isFunction(sunlightService.getIssues)).toBe(true);
    });
    
    it('makes a request to the backend with search topic', function () {
      spyOn(sunlightService, 'getIssues').andCallThrough();
      
      $httpBackend.expectGET(baseUrl + 'topic/' + topic)
        .respond(200, mockTopicResponse);
      
      sunlightService.getIssues(topic);
      $httpBackend.flush();
    });
    
    
  });
  
  describe('#getBill', function() {
    var billId = "hr2910-113";
    var mockBillResponse = {
      "results": [
        {
          "bill_id": "hr2910-113",
          "cosponsor_ids": [
            "C001036",
            "D000096",
            "M001163",
            "N000179",
            "P000034",
            "S001145"
          ],
          "cosponsors_count": 6,
          "introduced_on": "2013-08-01",
          "keywords": [
            "Aging",
            "Child health",
            "Crime and law enforcement",
            "Disability and health-based discrimination",
            "Drug, alcohol, tobacco use",
            "Education programs funding",
            "Emergency medical services and trauma care",
            "Employee benefits and pensions",
            "Firearms and explosives",
            "Government studies and investigations",
            "Health care costs and insurance",
            "Health care coverage and access",
            "Health information and medical records",
            "Health personnel",
            "Health programs administration and funding",
            "Higher education",
            "Marketing and advertising",
            "Medical education",
            "Medical research",
            "Mental health",
            "Research administration and funding",
            "Right of privacy",
            "Student aid and college costs",
            "Teaching, teachers, curricula",
            "Violent crime"
          ],
          "last_version": {
            "version_code": "ih",
            "issued_on": "2013-08-01",
            "version_name": "Introduced in House",
            "bill_version_id": "hr2910-113-ih",
            "urls": {
              "html": "http://www.gpo.gov/fdsys/pkg/BILLS-113hr2910ih/html/BILLS-113hr2910ih.htm",
              "pdf": "http://www.gpo.gov/fdsys/pkg/BILLS-113hr2910ih/pdf/BILLS-113hr2910ih.pdf",
              "xml": "http://www.gpo.gov/fdsys/pkg/BILLS-113hr2910ih/xml/BILLS-113hr2910ih.xml"
            },
            "pages": 54
          },
          "last_vote_at": null,
          "official_title": "To protect American children and their families from the epidemic of gun violence by banning access to certain weapons, strengthening the Nation's mental health infrastructure, and improving the understanding of gun violence.",
          "popular_title": null,
          "short_title": "Gun Violence Prevention and Reduction Act of 2013",
          "sponsor": {
            "bioguide_id": "W000215",
            "birthday": "1939-09-12",
            "chamber": "house",
            "contact_form": "https://waxman.house.gov/contact-me/email-me",
            "crp_id": "N00001861",
            "district": 33,
            "facebook_id": "129514917081997",
            "fax": "202-225-4099",
            "fec_ids": [
              "H6CA24048"
            ],
            "first_name": "Henry",
            "gender": "M",
            "govtrack_id": "400425",
            "icpsr_id": 14280,
            "in_office": true,
            "last_name": "Waxman",
            "middle_name": "A.",
            "name_suffix": null,
            "nickname": null,
            "oc_email": "Rep.Waxman@opencongress.org",
            "ocd_id": "ocd-division/country:us/state:ca/cd:33",
            "office": "2204 Rayburn House Office Building",
            "party": "D",
            "phone": "202-225-3976",
            "state": "CA",
            "state_name": "California",
            "term_end": "2015-01-03",
            "term_start": "2013-01-03",
            "thomas_id": "01209",
            "title": "Rep",
            "twitter_id": "WaxmanClimate",
            "votesmart_id": 26753,
            "website": "http://waxman.house.gov",
            "youtube_id": "RepHenryWaxman"
          },
          "summary": "Gun Violence Prevention and Reduction Act of 2013 - Considers as a banned hazardous product under the Consumer Product Safety Act any firearm receiver casting or firearm receiver blank (do-it-yourself assault weapon) that: (1) at the point of sale does not meet the definition of a firearm under the federal criminal code; and (2) after purchase can be completed by the consumer to the point at which such casting or blank functions as a firearm frame or receiver for a semiautomatic assault weapon or machine gun.\n\nMakes it unlawful to sell, offer for sale, manufacture for sale, or import into the United States for sale, to a consumer an assault weapon parts kit or machine gun parts kit.\n\nMakes it unlawful to market or advertise any of these weapons for sale on any medium of electronic communications, including over the Internet.\n\nAmends the Public Health Service Act to require the Director of the National Institute of Mental Health to conduct or support research on the causes, prevention, and treatment of serious mental illness.\n\nAuthorizes additional appropriations for National Health Service Corps scholarship and loan repayments in order to ensure an adequate supply of behavioral and mental health professionals.\n\nReauthorizes the mental and behavioral health education and training program of the Health Resources and Services Administration (HRSA) of the Department of Health and Human Services (HHS).\n\nRenames mental illness awareness training grants as mental health awareness grants.\n\nAuthorizes the Secretary of HHS to award grants under the Substance Abuse and Mental Health Services Administration (SAMHSA) to eligible entities for the development of curricula for continuing education and training to health care professionals on identifying, referring, and treating individuals with serious mental illness.\n\nRevises the program to assist local communities in developing ways to assist children in dealing with violence. Requires the Secretary to assist local communities and schools in implementing a comprehensive mental health program to assist children in dealing with trauma and violence.\n\nReplaces the mandate for youth interagency research, training, and technical assistance centers to one for a single suicide prevention technical assistance center addressing the prevention of suicide among all ages, particularly among groups at high risk for suicide.\n\nReauthorizes and revises the programs for: (1) youth suicide early intervention and prevention strategies, and (2) mental health and substance abuse disorder services.\n\nDirects the Secretary, acting through the SAMHSA and HRSA Administrators, to award grants, contracts, and cooperative agreements to eligible entities for the provision of coordinated and integrated mental health services and primary health care.\n\nRequires programs receiving grants to address the problems of persons who experience violence related stress to provide for continued operation of the National Child Traumatic Stress Initiative (NCTSI), including an NCTSI coordinating center.\n\nDirects the Secretary to provide information to priority mental health need grantees regarding evidence-based practices for the prevention and treatment of geriatric mental health disorders and co-occurring mental health and substance use disorders.\n\nDirects the Comptroller General (GAO) to study: (1) the availability of inpatient beds for treatment of mental health disorders; (2) its impact on access to, and the quality of, mental health services; and (3) the impact on individuals with serious mental illness and on states of the exclusion from medical assistance under title XIX (Medicaid) of the Social Security Act of payment for care or services for certain patients in an institution for mental diseases.\n\nIncreases requirements for certain annual reports and audits by states of recipients of block grants for: (1) Community Mental Health Services, and(2) prevention and treatment of substance use disorders.\n\n Declares that the Paul Wellstone and Pete Domenici Mental Health Parity and Addiction Equity Act of 2008 shall be construed, in the case of a group health plan or health insurance coverage that provides both medical and surgical benefits and mental health and substance use disorder benefits, to ensure full parity of such benefits, including: (1) at all levels of medically appropriate treatment, and (2) with respect to applicable medical management techniques.\n\nAuthorizes the Secretary to award grants, contracts, and cooperative agreements to eligible entities for planning, establishing, coordinating, and evaluating a nationwide public education campaign designed to: (1) promote public awareness and understanding of mental health disorders, including serious mental illness; and (2) reduce the stigma associated with mental health disorders.\n\nRequires the Centers for Disease Control and Prevention (CDC) to research the causes, mechanisms, prevention, diagnosis, and treatment of injuries from gun violence. Prohibits construction of this mandate, however, as authorizing advocacy or promotion of gun control.\n\nRequires the Secretary, acting through the CDC Director, to improve the National Violent Death Reporting System, particularly through the voluntary participation of additional states.\n\nDeclares that none of the authorities provided to the Secretary under the Patient Protection and Affordable Care Act shall be construed to prohibit a physician or other health care provider from: (1) asking a patient about the ownership, possession, use, or storage of a firearm or ammunition in the patient's home; (2) speaking to a patient about gun safety; or (3) reporting to the authorities a patient's threat of violence.",
          "summary_short": "Gun Violence Prevention and Reduction Act of 2013 - Considers as a banned hazardous product under the Consumer Product Safety Act any firearm receiver casting or firearm receiver blank (do-it-yourself assault weapon) that: (1) at the point of sale does not meet the definition of a firearm under the federal criminal code; and (2) after purchase can be completed by the consumer to the point at which such casting or blank functions as a firearm frame or receiver for a semiautomatic assault weapon or machine gun.\n\nMakes it unlawful to sell, offer for sale, manufacture for sale, or import into the United States for sale, to a consumer an assault weapon parts kit or machine gun parts kit.\n\nMakes it unlawful to market or advertise any of these weapons for sale on any medium of electronic communications, including over the Internet.\n\nAmends the Public Health Service Act to require the Director of the National Institute of Mental Health to conduct or support research on the causes, prevention, a...",
          "urls": {
            "congress": "http://beta.congress.gov/bill/113th/house-bill/2910",
            "govtrack": "https://www.govtrack.us/congress/bills/113/hr2910",
            "opencongress": "http://www.opencongress.org/bill/hr2910-113"
          }
        }
      ],
      "count": 1,
      "page": {
        "count": 1,
        "per_page": 20,
        "page": 1
      },
      "status": "success"
    };
    
    it('exists', function(){
      expect(angular.isFunction(sunlightService.getBill)).toBe(true);
    });
    
    it('makes a request to the backend with billId', function() {
      spyOn(sunlightService, "getBill").andCallThrough();
      
      $httpBackend.expectGET(baseUrl + 'bill/' + billId)
        .respond(200, mockBillResponse);
      
      sunlightService.getBill(billId);
      $httpBackend.flush();      
    });
  });

  describe('#billsSponsoredByCongressman', function() {
    var congressmenId = 'W000215';
    var mockBillsSponsoredByCongressmanResponse = {
      "results": [
        {
          "last_vote_at": null,
          "summary": "Motor Vehicle Safety Act of 2014 - Revises early warning reporting requirements for manufacturers of motor vehicles regarding possible defects of motor vehicles and motor vehicle equipment.\n\nAuthorizes the Secretary of Transportation (DOT) to issue regulations establishing categories of information that must be made available to the public. Requires the public disclosure of possible defects of motor vehicles or related equipment reported to the Secretary by motor vehicle manufacturers (Early Warning data).\n\nDirects the Secretary to require a manufacturer in cases where the defect has caused a fatality to provide, and make public, certain additional information in its report to the Secretary.\n\nDirects the Secretary to give public notice on the National Highway Traffic Safety Administration (NHTSA) website of all inspections and investigations conducted by the Secretary to enforce a motor vehicle safety requirement or order, or that are related to a motor vehicle accident due to a possible defect.\n\nDirects the Secretary to: (1) take specified actions to improve public accessibility to vehicle safety information on NHTSA's website, and (2) promulgate rules requiring the senior senior official for safety for a corporation to be responsible for requests for information in NHTSA safety or compliance investigations.\n\nRequires the DOT Office of the Inspector General to study NHTSA use of Early Warning data.\n\nProhibits certain vehicle safety officials, for the one-year period after termination of NHTSA employment, from knowingly making any communication to or appearance before NHTSA on behalf of a manufacturer subject to NHTSA regulation in connection with any matter involving vehicle safety on which such person seeks official action by a NHTSA officer or employee.\n\nEstablishes the Vehicle Safety Fund to meet U.S. obligations in carrying out NHTSA vehicle safety programs. Requires the Secretary to assess and collect, for deposit in the Fund, a vehicle safety user fee from the manufacturer for each motor vehicle certified compliant with applicable motor vehicle safety standards.\n\nIncreases civil penalties for persons who violate federal motor vehicle safety requirements.\n\nRequires the Secretary to: (1) notify manufacturers of motor vehicles or motor vehicle equipment whose defect or noncompliance with federal motor vehicle safety standards presents a substantial likelihood of death or serious injury to the public, and (2) expedite proceedings for a decision and issuance of an imminent hazard order. Directs the Secretary to issue procedures for the issuance and enforcement of such orders.\n\nProhibits the Secretary from promulgating motor vehicle safety regulations that address preemption of state tort law without congressional authorization.",
          "short_title": "Motor Vehicle Safety Act of 2014",
          "keywords": [
            "Administrative law and regulatory procedures",
            "Advanced technology and technological innovations",
            "Business ethics",
            "Business records",
            "Civil actions and liability",
            "Congressional oversight",
            "Department of Transportation",
            "Federal preemption",
            "Government ethics and transparency, public corruption",
            "Government information and archives",
            "Government studies and investigations",
            "Government trust funds",
            "Judicial review and appeals",
            "Motor vehicles",
            "Product safety and quality",
            "Public participation and lobbying",
            "Transportation and public works",
            "Transportation programs funding",
            "Transportation safety and security",
            "User charges and fees"
          ],
          "popular_title": null,
          "sponsor_id": "W000215",
          "official_title": "To provide greater transparency, accountability, and safety authority to the National Highway Traffic Safety Administration, and for other purposes.",
          "bill_id": "hr4364-113",
          "introduced_on": "2014-04-01",
          "summary_short": "Motor Vehicle Safety Act of 2014 - Revises early warning reporting requirements for manufacturers of motor vehicles regarding possible defects of motor vehicles and motor vehicle equipment.\n\nAuthorizes the Secretary of Transportation (DOT) to issue regulations establishing categories of information that must be made available to the public. Requires the public disclosure of possible defects of motor vehicles or related equipment reported to the Secretary by motor vehicle manufacturers (Early Warning data).\n\nDirects the Secretary to require a manufacturer in cases where the defect has caused a fatality to provide, and make public, certain additional information in its report to the Secretary.\n\nDirects the Secretary to give public notice on the National Highway Traffic Safety Administration (NHTSA) website of all inspections and investigations conducted by the Secretary to enforce a motor vehicle safety requirement or order, or that are related to a motor vehicle accident due to a possibl...",
          "search": {
            "score": 1,
            "type": "bill"
          }
        },
        {
          "last_vote_at": null,
          "summary": "Grid Reliability and Infrastructure Defense Act or the GRID Act - Amends the Federal Power Act to authorize the Federal Energy Regulatory Commission (FERC), with or without notice, hearing, or report, to issue orders for emergency measures to protect the reliability of either the bulk-power system or the defense critical electric infrastructure whenever the President issues a written directive or determination identifying an imminent grid security threat.\n\nRequires either the President or the Secretary of Energy (DOE) to notify specified congressional committees promptly whenever the President issues such a directive.\n\nInstructs FERC, to the extent practicable in light of the nature of the grid security threat and the urgency for emergency measures, to consult with certain governmental authorities, including in Canada and Mexico, regarding implementation of such emergency measures.\n\nPrescribes: (1) implementation procedures; and (2) related cost recovery measures affecting owners, operators, or users of either the bulk-power system or the defense critical electric infrastructure.\n\nDirects FERC to require any owner, user, or operator of the bulk-power system in the United States to implement measures necessary to protect the bulk-power system against specified vulnerabilities.\n\nDirects FERC to order the Electric Reliability Organization (ERO) to submit reliability standards requiring owners or operators of large transformers to ensure their adequate availability to restore promptly the reliable operation of the bulk-power system in the event that any such transformer is destroyed or disabled as a result of a reasonably foreseeable physical or other attack or a geomagnetic storm event.\n\nDirects the President to designate for FERC the domestic facilities that are: (1) critical to the national defense, and (2) vulnerable to an electric energy supply disruption.\n\nDirects FERC to require an owner or operator of defense critical electric infrastructure to implement measures to protect it against any vulnerability that has not been adequately addressed.\n\nDirects FERC, before promulgating a rule or issuing such order, to request and consider recommendations from the ERO.\n\nDirects the Secretary to establish a program to develop technical expertise in the protection of systems for the generation, transmission, and distribution of electric energy against either geomagnetic storms or malicious acts using electronic communications or electromagnetic pulse.\n\nExempts the Tennessee Valley Authority (TVA) and the Bonneville Power Administration for 11 years from any requirement under this Act pertaining to emergency response measures or measures to address grid security vulnerabilities (except for a requirement addressing a malicious act using electronic communication).",
          "short_title": "GRID Act",
          "keywords": [
            "Administrative law and regulatory procedures",
            "Administrative remedies",
            "Atmospheric science and weather",
            "Canada",
            "Computer security and identity theft",
            "Congressional oversight",
            "Electric power generation and transmission",
            "Energy",
            "Federal Energy Regulatory Commission (FERC)",
            "Homeland security",
            "International organizations and cooperation",
            "Latin America",
            "Mexico",
            "Military facilities and property",
            "Natural disasters"
          ],
          "popular_title": null,
          "sponsor_id": "W000215",
          "official_title": "To amend the Federal Power Act to protect the bulk-power system and electric infrastructure critical to the defense of the United States against cybersecurity, physical, and other threats and vulnerabilities.",
          "bill_id": "hr4298-113",
          "introduced_on": "2014-03-26",
          "summary_short": "Grid Reliability and Infrastructure Defense Act or the GRID Act - Amends the Federal Power Act to authorize the Federal Energy Regulatory Commission (FERC), with or without notice, hearing, or report, to issue orders for emergency measures to protect the reliability of either the bulk-power system or the defense critical electric infrastructure whenever the President issues a written directive or determination identifying an imminent grid security threat.\n\nRequires either the President or the Secretary of Energy (DOE) to notify specified congressional committees promptly whenever the President issues such a directive.\n\nInstructs FERC, to the extent practicable in light of the nature of the grid security threat and the urgency for emergency measures, to consult with certain governmental authorities, including in Canada and Mexico, regarding implementation of such emergency measures.\n\nPrescribes: (1) implementation procedures; and (2) related cost recovery measures affecting owners, opera...",
          "search": {
            "score": 1,
            "type": "bill"
          }
        },
        {
          "last_vote_at": null,
          "summary": "Authorizes the Secretary of Veterans Affairs (VA) to enter into an enhanced-use lease for buildings 205 and 208 of the West Los Angeles Medical Center, California, for the provision of long-term therapeutic housing for homeless veterans who require assisted living or other similar forms of care. Exempts such buildings from a provision authorizing the Secretary to transfer property under an enhanced-use lease to the lessee.\n\nRequires the Secretary to: (1) review such lease at least once during each two-year period in which it is in effect, including by assessing the leasing party and determining whether such lease should continue; and (2) submit a report.",
          "short_title": null,
          "keywords": [
            "Armed forces and national security",
            "California",
            "Congressional oversight",
            "Government buildings, facilities, and property",
            "Health facilities and institutions",
            "Long-term, rehabilitative, and terminal care",
            "Veterans' loans, housing, homeless programs",
            "Veterans' medical care"
          ],
          "popular_title": null,
          "sponsor_id": "W000215",
          "official_title": "To authorize the Secretary of Veterans Affairs to enter into enhanced-use leases for certain buildings of the Department of Veterans Affairs at the West Los Angeles Medical Center, California.",
          "bill_id": "hr4004-113",
          "introduced_on": "2014-02-05",
          "summary_short": "Authorizes the Secretary of Veterans Affairs (VA) to enter into an enhanced-use lease for buildings 205 and 208 of the West Los Angeles Medical Center, California, for the provision of long-term therapeutic housing for homeless veterans who require assisted living or other similar forms of care. Exempts such buildings from a provision authorizing the Secretary to transfer property under an enhanced-use lease to the lessee.\n\nRequires the Secretary to: (1) review such lease at least once during each two-year period in which it is in effect, including by assessing the leasing party and determining whether such lease should continue; and (2) submit a report.",
          "search": {
            "score": 1,
            "type": "bill"
          }
        },
        {
          "last_vote_at": null,
          "summary": "Open Internet Preservation Act of 2014 - Restores rules adopted by the Federal Communications Commission (FCC) in the Report and Order in the matter of preserving the open Internet and broadband industry practices (adopted on December 21, 2010) that were vacated by the U.S. Court of Appeals for the D.C. Circuit in Verizon v. Federal Communications Commission (decided on January 14, 2014).\n\nRequires such rules to remain in effect until the FCC takes final action in the proceedings remanded to the FCC in such D.C. Circuit decision.",
          "short_title": "Open Internet Preservation Act of 2014",
          "keywords": [
            "Administrative law and regulatory procedures",
            "Federal Communications Commission (FCC)",
            "Internet and video services",
            "Science, technology, communications"
          ],
          "popular_title": null,
          "sponsor_id": "W000215",
          "official_title": "To provide that the rules of the Federal Communications Commission relating to preserving the open Internet and broadband industry practices shall be restored to effect until the date when the Commission takes final action in the proceedings on such rules that were remanded to the Commission by the United States Court of Appeals for the District of Columbia Circuit.",
          "bill_id": "hr3982-113",
          "introduced_on": "2014-02-03",
          "summary_short": "Open Internet Preservation Act of 2014 - Restores rules adopted by the Federal Communications Commission (FCC) in the Report and Order in the matter of preserving the open Internet and broadband industry practices (adopted on December 21, 2010) that were vacated by the U.S. Court of Appeals for the D.C. Circuit in Verizon v. Federal Communications Commission (decided on January 14, 2014).\n\nRequires such rules to remain in effect until the FCC takes final action in the proceedings remanded to the FCC in such D.C. Circuit decision.",
          "search": {
            "score": 1,
            "type": "bill"
          }
        },
        {
          "last_vote_at": null,
          "summary": "Gun Violence Prevention and Reduction Act of 2013 - Considers as a banned hazardous product under the Consumer Product Safety Act any firearm receiver casting or firearm receiver blank (do-it-yourself assault weapon) that: (1) at the point of sale does not meet the definition of a firearm under the federal criminal code; and (2) after purchase can be completed by the consumer to the point at which such casting or blank functions as a firearm frame or receiver for a semiautomatic assault weapon or machine gun.\n\nMakes it unlawful to sell, offer for sale, manufacture for sale, or import into the United States for sale, to a consumer an assault weapon parts kit or machine gun parts kit.\n\nMakes it unlawful to market or advertise any of these weapons for sale on any medium of electronic communications, including over the Internet.\n\nAmends the Public Health Service Act to require the Director of the National Institute of Mental Health to conduct or support research on the causes, prevention, and treatment of serious mental illness.\n\nAuthorizes additional appropriations for National Health Service Corps scholarship and loan repayments in order to ensure an adequate supply of behavioral and mental health professionals.\n\nReauthorizes the mental and behavioral health education and training program of the Health Resources and Services Administration (HRSA) of the Department of Health and Human Services (HHS).\n\nRenames mental illness awareness training grants as mental health awareness grants.\n\nAuthorizes the Secretary of HHS to award grants under the Substance Abuse and Mental Health Services Administration (SAMHSA) to eligible entities for the development of curricula for continuing education and training to health care professionals on identifying, referring, and treating individuals with serious mental illness.\n\nRevises the program to assist local communities in developing ways to assist children in dealing with violence. Requires the Secretary to assist local communities and schools in implementing a comprehensive mental health program to assist children in dealing with trauma and violence.\n\nReplaces the mandate for youth interagency research, training, and technical assistance centers to one for a single suicide prevention technical assistance center addressing the prevention of suicide among all ages, particularly among groups at high risk for suicide.\n\nReauthorizes and revises the programs for: (1) youth suicide early intervention and prevention strategies, and (2) mental health and substance abuse disorder services.\n\nDirects the Secretary, acting through the SAMHSA and HRSA Administrators, to award grants, contracts, and cooperative agreements to eligible entities for the provision of coordinated and integrated mental health services and primary health care.\n\nRequires programs receiving grants to address the problems of persons who experience violence related stress to provide for continued operation of the National Child Traumatic Stress Initiative (NCTSI), including an NCTSI coordinating center.\n\nDirects the Secretary to provide information to priority mental health need grantees regarding evidence-based practices for the prevention and treatment of geriatric mental health disorders and co-occurring mental health and substance use disorders.\n\nDirects the Comptroller General (GAO) to study: (1) the availability of inpatient beds for treatment of mental health disorders; (2) its impact on access to, and the quality of, mental health services; and (3) the impact on individuals with serious mental illness and on states of the exclusion from medical assistance under title XIX (Medicaid) of the Social Security Act of payment for care or services for certain patients in an institution for mental diseases.\n\nIncreases requirements for certain annual reports and audits by states of recipients of block grants for: (1) Community Mental Health Services, and(2) prevention and treatment of substance use disorders.\n\n Declares that the Paul Wellstone and Pete Domenici Mental Health Parity and Addiction Equity Act of 2008 shall be construed, in the case of a group health plan or health insurance coverage that provides both medical and surgical benefits and mental health and substance use disorder benefits, to ensure full parity of such benefits, including: (1) at all levels of medically appropriate treatment, and (2) with respect to applicable medical management techniques.\n\nAuthorizes the Secretary to award grants, contracts, and cooperative agreements to eligible entities for planning, establishing, coordinating, and evaluating a nationwide public education campaign designed to: (1) promote public awareness and understanding of mental health disorders, including serious mental illness; and (2) reduce the stigma associated with mental health disorders.\n\nRequires the Centers for Disease Control and Prevention (CDC) to research the causes, mechanisms, prevention, diagnosis, and treatment of injuries from gun violence. Prohibits construction of this mandate, however, as authorizing advocacy or promotion of gun control.\n\nRequires the Secretary, acting through the CDC Director, to improve the National Violent Death Reporting System, particularly through the voluntary participation of additional states.\n\nDeclares that none of the authorities provided to the Secretary under the Patient Protection and Affordable Care Act shall be construed to prohibit a physician or other health care provider from: (1) asking a patient about the ownership, possession, use, or storage of a firearm or ammunition in the patient's home; (2) speaking to a patient about gun safety; or (3) reporting to the authorities a patient's threat of violence.",
          "short_title": "Gun Violence Prevention and Reduction Act of 2013",
          "keywords": [
            "Aging",
            "Child health",
            "Crime and law enforcement",
            "Disability and health-based discrimination",
            "Drug, alcohol, tobacco use",
            "Education programs funding",
            "Emergency medical services and trauma care",
            "Employee benefits and pensions",
            "Firearms and explosives",
            "Government studies and investigations",
            "Health care costs and insurance",
            "Health care coverage and access",
            "Health information and medical records",
            "Health personnel",
            "Health programs administration and funding",
            "Higher education",
            "Marketing and advertising",
            "Medical education",
            "Medical research",
            "Mental health",
            "Research administration and funding",
            "Right of privacy",
            "Student aid and college costs",
            "Teaching, teachers, curricula",
            "Violent crime"
          ],
          "popular_title": null,
          "sponsor_id": "W000215",
          "official_title": "To protect American children and their families from the epidemic of gun violence by banning access to certain weapons, strengthening the Nation's mental health infrastructure, and improving the understanding of gun violence.",
          "bill_id": "hr2910-113",
          "introduced_on": "2013-08-01",
          "summary_short": "Gun Violence Prevention and Reduction Act of 2013 - Considers as a banned hazardous product under the Consumer Product Safety Act any firearm receiver casting or firearm receiver blank (do-it-yourself assault weapon) that: (1) at the point of sale does not meet the definition of a firearm under the federal criminal code; and (2) after purchase can be completed by the consumer to the point at which such casting or blank functions as a firearm frame or receiver for a semiautomatic assault weapon or machine gun.\n\nMakes it unlawful to sell, offer for sale, manufacture for sale, or import into the United States for sale, to a consumer an assault weapon parts kit or machine gun parts kit.\n\nMakes it unlawful to market or advertise any of these weapons for sale on any medium of electronic communications, including over the Internet.\n\nAmends the Public Health Service Act to require the Director of the National Institute of Mental Health to conduct or support research on the causes, prevention, a...",
          "search": {
            "score": 1,
            "type": "bill"
          }
        },
        {
          "last_vote_at": null,
          "summary": "Medicare Drug Savings Act of 2013 - Amends part D (Voluntary Prescription Drug Benefit Program) of title XVIII (Medicare) of the Social Security Act (SSA) to require drug manufacturers to pay the Secretary of Health and Human Services (HHS) drug rebates for rebate eligible (low-income) individuals. Excludes from Medicare coverage as a part D drug any drug or biological manufactured by a manufacturer that has not entered into and have in effect a rebate agreement with the Secretary.\n\nRequires a rebate agreement to require a drug or biological manufacturer to provide to the Secretary a rebate, determined according to a specified formula, for each rebate period ending after December 31, 2011, for any covered Medicare part D drug dispensed after that date to any rebate eligible individual for which payment was made by a prescription drug plan (PDP) sponsor or MedicareAdvantage (MA) organization for such period.\n\nSpecifies a formula for determination of Medicaid rebate amounts for such drugs or biologicals.\n\nAmends SSA title XIX (Medicaid) to exclude any amounts paid under a rebate agreement from the determination of best price and average manufacturer price under the Medicaid program.",
          "short_title": "Medicare Drug Savings Act of 2013",
          "keywords": [
            "Health",
            "Health care costs and insurance",
            "Medicaid",
            "Medicare",
            "Prescription drugs",
            "Public contracts and procurement",
            "Retail and wholesale trades"
          ],
          "popular_title": null,
          "sponsor_id": "W000215",
          "official_title": "To amend title XVIII of the Social Security Act to require drug manufacturers to provide drug rebates for drugs dispensed to low-income individuals under the Medicare prescription drug benefit program.",
          "bill_id": "hr1588-113",
          "introduced_on": "2013-04-16",
          "summary_short": "Medicare Drug Savings Act of 2013 - Amends part D (Voluntary Prescription Drug Benefit Program) of title XVIII (Medicare) of the Social Security Act (SSA) to require drug manufacturers to pay the Secretary of Health and Human Services (HHS) drug rebates for rebate eligible (low-income) individuals. Excludes from Medicare coverage as a part D drug any drug or biological manufactured by a manufacturer that has not entered into and have in effect a rebate agreement with the Secretary.\n\nRequires a rebate agreement to require a drug or biological manufacturer to provide to the Secretary a rebate, determined according to a specified formula, for each rebate period ending after December 31, 2011, for any covered Medicare part D drug dispensed after that date to any rebate eligible individual for which payment was made by a prescription drug plan (PDP) sponsor or MedicareAdvantage (MA) organization for such period.\n\nSpecifies a formula for determination of Medicaid rebate amounts for such drugs...",
          "search": {
            "score": 1,
            "type": "bill"
          }
        },
        {
          "last_vote_at": null,
          "summary": "Recognizes: (1) the cultural and historical significance of Nowruz; (2) the aspirations of all people, including the people of Iran, for human rights and religious tolerance as embodied by the Cyrus Cylinder; and (3) the tour of the Cyrus Cylinder throughout the United States.",
          "short_title": null,
          "keywords": [
            "Arts, culture, religion",
            "Commemorative events and holidays",
            "Historical and cultural resources",
            "Human rights",
            "Iran",
            "Middle East",
            "Museums, exhibitions, cultural centers",
            "Religion"
          ],
          "popular_title": null,
          "sponsor_id": "W000215",
          "official_title": "Recognizing the cultural and historical significance of Nowruz and acknowledging the Cyrus Cylinder as a symbol of respect for human rights and religious tolerance.",
          "bill_id": "hres130-113",
          "introduced_on": "2013-03-20",
          "summary_short": "Recognizes: (1) the cultural and historical significance of Nowruz; (2) the aspirations of all people, including the people of Iran, for human rights and religious tolerance as embodied by the Cyrus Cylinder; and (3) the tour of the Cyrus Cylinder throughout the United States.",
          "search": {
            "score": 1,
            "type": "bill"
          }
        },
        {
          "last_vote_at": null,
          "summary": "Provides for the relief of Allan Bolor Kelley.",
          "short_title": null,
          "keywords": [
            "Private legislation"
          ],
          "popular_title": null,
          "sponsor_id": "W000215",
          "official_title": "For the relief of Allan Bolor Kelley.",
          "bill_id": "hr1207-113",
          "introduced_on": "2013-03-14",
          "summary_short": "Provides for the relief of Allan Bolor Kelley.",
          "search": {
            "score": 1,
            "type": "bill"
          }
        },
        {
          "last_vote_at": null,
          "summary": "Delivering Antimicrobial Transparency in Animals Act of 2013 - Amends the Federal Food, Drug, and Cosmetic Act to revise reporting requirements for the sponsor of a new animal drug containing an antimicrobial active ingredient. Requires a sponsor's annual report to the Secretary of Health and Human Services (HHS) to specify for each dosage form the known or estimated amounts of the antimicrobial active ingredient sold or distributed for use in each food-producing animal for which the new animal drug is approved.\n\nRepeals the requirement that such report list, for each dosage form, the target animals, indications, and production classes specified on the approved label of the product.\n\n Requires live poultry dealers, swine contractors, or feed lot operators who purchase, contract, or manufacture animal feed in final formulation bearing or containing a new animal drug with an antimicrobial active ingredient to report annually to the Secretary information about such ingredient by food-producing animal for which the new animal drug is approved and, if applicable, by production class of the animal. Exempts dealers, contractors, or operators from this reporting requirement if the value of their live animals does not exceed $10 million or such other sum as the Secretary may specify. Authorizes the Secretary to specify alternative reporting requirements.\n\nEstablishes requirements for: (1) publicly available summaries of the information in the annual reports, including data by antimicrobial class; and (2) how to report data with fewer than three sponsors of such approved new animal drugs.\n\n Requires the Secretary, acting through the Commissioner of Food and Drugs (FDA), to increase collaboration and coordination with the Secretary of Agriculture (USDA) to expand and coordinate the collection of data on the use of antimicrobial drugs in or on food-producing animals, as well as provide information to the Secretary of Agriculture for use by: (1) the Animal and Plant Health Inspection Service to help inform its collection of data through the National Animal Health Monitoring System, and (2) the Economic Research Service to help inform its collection of data through the Agricultural Resource Management Survey.\n\nRequires the Secretary to publish a final version of draft guidance #213 entitled “New Animal Drugs and New Animal Drug Combination Products Administered in or on Medicated Feed or Drinking Water of Food-Producing Animals: Recommendations for Drug Sponsors for Voluntarily Aligning Product Use Conditions with GFI #209.” Requires the Comptroller General (GAO), within three years after such publication, to evaluate: (1) the voluntary approach used by the FDA to eliminate injudicious use of antimicrobial drugs in food-producing animals, and (2) the effectiveness of FDA data collection activities regarding antimicrobial resistance.",
          "short_title": "Delivering Antimicrobial Transparency in Animals Act of 2013",
          "keywords": [
            "Administrative law and regulatory procedures",
            "Business records",
            "Congressional oversight",
            "Department of Health and Human Services",
            "Drug safety, medical device, and laboratory regulation",
            "Food and Drug Administration (FDA)",
            "Food supply, safety, and labeling",
            "Government information and archives",
            "Government studies and investigations",
            "Health",
            "Infectious and parasitic diseases",
            "Livestock",
            "Medical research",
            "Retail and wholesale trades",
            "Veterinary medicine and animal diseases"
          ],
          "popular_title": null,
          "sponsor_id": "W000215",
          "official_title": "To amend the Federal Food, Drug, and Cosmetic Act to enhance the reporting requirements pertaining to use of antimicrobial drugs in food animals.",
          "bill_id": "hr820-113",
          "introduced_on": "2013-02-26",
          "summary_short": "Delivering Antimicrobial Transparency in Animals Act of 2013 - Amends the Federal Food, Drug, and Cosmetic Act to revise reporting requirements for the sponsor of a new animal drug containing an antimicrobial active ingredient. Requires a sponsor's annual report to the Secretary of Health and Human Services (HHS) to specify for each dosage form the known or estimated amounts of the antimicrobial active ingredient sold or distributed for use in each food-producing animal for which the new animal drug is approved.\n\nRepeals the requirement that such report list, for each dosage form, the target animals, indications, and production classes specified on the approved label of the product.\n\n Requires live poultry dealers, swine contractors, or feed lot operators who purchase, contract, or manufacture animal feed in final formulation bearing or containing a new animal drug with an antimicrobial active ingredient to report annually to the Secretary information about such ingredient by food-produ...",
          "search": {
            "score": 1,
            "type": "bill"
          }
        }
      ],
      "count": 9,
      "page": {
        "count": 9,
        "per_page": 20,
        "page": 1
      },
      "status": "success"
    };
    
    it('exists', function(){
      expect(angular.isFunction(sunlightService.billsSponsoredByCongressman)).toBe(true);
    });
    
    it('makes a request to the backend with congressman bio_guideId', function() {
      spyOn(sunlightService, "billsSponsoredByCongressman").andCallThrough();
      
      $httpBackend.expectGET(baseUrl + 'congressman/bills/' + congressmenId)
        .respond(200, mockBillsSponsoredByCongressmanResponse);
      sunlightService.billsSponsoredByCongressman(congressmenId);
      $httpBackend.flush();
    });
  });

  describe('#getDistrictByZipCode', function() {
    var zipCode = "60601";
    var mockDistrictSearchByZipcodeResponse = {
      "results" :
        [
          {
            "state" : "IL",
            "district" : 7
          }
        ],
      "count" : 1
    };
    
    it('exists', function(){
      expect(angular.isFunction(sunlightService.getDistrictByZipCode)).toBe(true);
    });
    
    it('makes a request to the backend with zipcode', function() {
      spyOn(sunlightService, "getDistrictByZipCode").andCallThrough();
      
      $httpBackend.expectGET(baseUrl + 'district/' + zipCode)
        .respond(200, mockDistrictSearchByZipcodeResponse);
      sunlightService.getDistrictByZipCode(zipCode);
      $httpBackend.flush();
    });
  });

  describe('#getDistrictByCoords', function() {
    var coordinates = {
      lat: '41.8856439',
      long: '-87.6225717'
    };
    var mockDistrictSearchByCoorsResponse = {
      "results": [
        {
          "state": "IL",
          "district": 7,
          "congressmen": [
            {
              "bioguide_id": "K000360",
              "chamber": "senate",
              "district": null,
              "first_name": "Mark",
              "last_name": "Kirk",
              "middle_name": "Steven",
              "oc_email": "Sen.Kirk@opencongress.org",
              "office": "524 Hart Senate Office Building",
              "party": "R",
              "phone": "202-224-2854",
              "state": "IL",
              "website": "http://www.kirk.senate.gov",
              "_id": "54ec9c80e0f78d73bd000132",
              "__v": 0
            },
            {
              "bioguide_id": "D000096",
              "chamber": "house",
              "district": 7,
              "fax": "202-225-5641",
              "first_name": "Danny",
              "last_name": "Davis",
              "middle_name": "K.",
              "oc_email": "Rep.Davis@opencongress.org",
              "office": "2159 Rayburn House Office Building",
              "party": "D",
              "phone": "202-225-5006",
              "state": "IL",
              "website": "http://www.davis.house.gov",
              "_id": "54ec9c80e0f78d73bd00019c",
              "__v": 0
            },
            {
              "bioguide_id": "D000563",
              "chamber": "senate",
              "district": null,
              "fax": "202-228-0400",
              "first_name": "Richard",
              "last_name": "Durbin",
              "middle_name": "J.",
              "oc_email": "Sen.Durbin@opencongress.org",
              "office": "711 Hart Senate Office Building",
              "party": "D",
              "phone": "202-224-2152",
              "state": "IL",
              "website": "http://www.durbin.senate.gov",
              "_id": "54ec9c80e0f78d73bd000203",
              "__v": 0
            }
          ]
        }
      ],
      "count": 1,
      "status": "success"
    };
    
    it('exists', function(){
      expect(angular.isFunction(sunlightService.getDistrictByCoords)).toBe(true);
    });
    
    it('makes a request to the backend with coordinates', function() {
      spyOn(sunlightService, "getDistrictByCoords").andCallThrough();
      
      $httpBackend.expectGET(baseUrl + 'district/lat/' + coordinates.lat + '/long/' + coordinates.long)
        .respond(200, mockDistrictSearchByCoorsResponse);
      sunlightService.getDistrictByCoords(coordinates);
      $httpBackend.flush();
    });
  });

  describe('#getDistrictByAddress', function() {
    var address = "3947 South Kind Dr, Chicago, IL";
    var mockDistrictSearchByAddressResponse = {
      "results": [
        {
          "state": "IL",
          "district": 7,
          "congressmen": [
            {
              "bioguide_id": "K000360",
              "chamber": "senate",
              "district": null,
              "first_name": "Mark",
              "last_name": "Kirk",
              "middle_name": "Steven",
              "oc_email": "Sen.Kirk@opencongress.org",
              "office": "524 Hart Senate Office Building",
              "party": "R",
              "phone": "202-224-2854",
              "state": "IL",
              "website": "http://www.kirk.senate.gov",
              "_id": "54ec9c80e0f78d73bd000132",
              "__v": 0
            },
            {
              "bioguide_id": "D000096",
              "chamber": "house",
              "district": 7,
              "fax": "202-225-5641",
              "first_name": "Danny",
              "last_name": "Davis",
              "middle_name": "K.",
              "oc_email": "Rep.Davis@opencongress.org",
              "office": "2159 Rayburn House Office Building",
              "party": "D",
              "phone": "202-225-5006",
              "state": "IL",
              "website": "http://www.davis.house.gov",
              "_id": "54ec9c80e0f78d73bd00019c",
              "__v": 0
            },
            {
              "bioguide_id": "D000563",
              "chamber": "senate",
              "district": null,
              "fax": "202-228-0400",
              "first_name": "Richard",
              "last_name": "Durbin",
              "middle_name": "J.",
              "oc_email": "Sen.Durbin@opencongress.org",
              "office": "711 Hart Senate Office Building",
              "party": "D",
              "phone": "202-224-2152",
              "state": "IL",
              "website": "http://www.durbin.senate.gov",
              "_id": "54ec9c80e0f78d73bd000203",
              "__v": 0
            }
          ]
        }
      ],
      "count": 1,
      "status": "success"
    };
    
    it('exists', function(){
      expect(angular.isFunction(sunlightService.getDistrictByAddress)).toBe(true);
    });
    
    xit('makes a request to the backend with address', function() {
      spyOn(sunlightService, 'getDistrictByAddress').andCallThrough();
      
      $httpBackend.expectGET(baseUrl + 'district/address', {address: address})
        .respond(200, mockDistrictSearchByAddressResponse);
      sunlightService.getDistrictByAddress(address);
      $httpBackend.flush();
    });
    
  });

  describe('#getCongressmenByDistrict', function() {
    var districtObj = {
      state: 'IL',
      districtNumber: '7'
    };
    
    var mockCongressmenByDistrictResponse = {
      "house": [
        {
          "bioguide_id": "D000096",
          "chamber": "house",
          "district": 7,
          "fax": "202-225-5641",
          "first_name": "Danny",
          "last_name": "Davis",
          "middle_name": "K.",
          "oc_email": "Rep.Davis@opencongress.org",
          "office": "2159 Rayburn House Office Building",
          "party": "D",
          "phone": "202-225-5006",
          "state": "IL",
          "website": "http://www.davis.house.gov",
          "_id": "54ec9c80e0f78d73bd00019c",
          "__v": 0
        }
      ],
      "senate": [
        {
          "bioguide_id": "K000360",
          "chamber": "senate",
          "district": null,
          "first_name": "Mark",
          "last_name": "Kirk",
          "middle_name": "Steven",
          "oc_email": "Sen.Kirk@opencongress.org",
          "office": "524 Hart Senate Office Building",
          "party": "R",
          "phone": "202-224-2854",
          "state": "IL",
          "website": "http://www.kirk.senate.gov",
          "_id": "54ec9c80e0f78d73bd000132",
          "__v": 0
        },
        {
          "bioguide_id": "D000563",
          "chamber": "senate",
          "district": null,
          "fax": "202-228-0400",
          "first_name": "Richard",
          "last_name": "Durbin",
          "middle_name": "J.",
          "oc_email": "Sen.Durbin@opencongress.org",
          "office": "711 Hart Senate Office Building",
          "party": "D",
          "phone": "202-224-2152",
          "state": "IL",
          "website": "http://www.durbin.senate.gov",
          "_id": "54ec9c80e0f78d73bd000203",
          "__v": 0
        }
      ]
    };
    
    it('exists', function(){
      expect(angular.isFunction(sunlightService.getCongressmenByDistrict)).toBe(true);
    });
    
    it('makes a request to the backend with state and district number to get Congressmen', function() {
      spyOn(sunlightService, 'getCongressmenByDistrict').andCallThrough();
      
      $httpBackend.expectGET(baseUrl + 'district/congressmen/state/' + districtObj.state + '/district/' + districtObj.districtNumber)
        .respond(200, mockCongressmenByDistrictResponse);
      sunlightService.getCongressmenByDistrict(districtObj);
      $httpBackend.flush();
    });
  });

  describe('#getCongressmanById', function() {
    var congressmanId = 'D000096';
    var mockCongressmanByIdResponse = [
      {
        "bioguide_id": "D000096",
        "chamber": "house",
        "district": 7,
        "fax": "202-225-5641",
        "first_name": "Danny",
        "last_name": "Davis",
        "middle_name": "K.",
        "oc_email": "Rep.Davis@opencongress.org",
        "office": "2159 Rayburn House Office Building",
        "party": "D",
        "phone": "202-225-5006",
        "state": "IL",
        "website": "http://www.davis.house.gov",
        "_id": "54ec9c80e0f78d73bd00019c",
        "__v": 0
      }
    ];
    
    it('exists', function(){
      expect(angular.isFunction(sunlightService.getCongressmanById)).toBe(true);
    });
    
    it('makes a request to the backend with a congressman bioguide_id', function() {
      spyOn(sunlightService, 'getCongressmanById').andCallThrough();
      
      $httpBackend.expectGET(baseUrl + 'congressman/' + congressmanId)
        .respond(200, mockCongressmanByIdResponse);
      sunlightService.getCongressmanById(congressmanId);
      $httpBackend.flush();
    });
  });

  describe('#getCosponsors', function() {
    it('exists', function(){
      expect(angular.isFunction(sunlightService.getCosponsors)).toBe(true);
    });
  });

  describe('#getSenators', function() {
    it('exists', function(){
      expect(angular.isFunction(sunlightService.getSenators)).toBe(true);
    });
  });

  describe('#getReps', function() {
    it('exists', function(){
      expect(angular.isFunction(sunlightService.getReps)).toBe(true);
    });
  });
});