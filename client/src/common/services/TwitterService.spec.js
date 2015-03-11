describe('Service: twitterService', function() {
  var twitterService, $httpBackend;
  var baseUrl = '/api/twitter/';
  
  beforeEach(module("hearUs"));
  beforeEach(inject(function (_twitterService_, _$httpBackend_) {
    twitterService = _twitterService_;
    $httpBackend = _$httpBackend_;
  }));
  
  afterEach(function() {
    $httpBackend.verifyNoOutstandingExpectation();
    $httpBackend.verifyNoOutstandingRequest();
  });
  
  it('creates a twitterService instance', function () {
    expect(twitterService).toBeDefined();
  });
  
  xdescribe('#getTweetsForBill', function() {
    it('should get a bill from ', function() {
      var bill = {
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
      };
      twitterService.getTweetsForBill(bill);
    });
  });
});