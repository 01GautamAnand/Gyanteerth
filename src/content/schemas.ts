import { z } from 'zod';
export const schemas = {
  pages: {
    home: z.object({
      "hero": z.object({
        "headline": z.string(),
        "subheadline": z.string(),
        "cta_primary": z.string(),
        "cta_secondary": z.string()
      }),
      "stats": z.array(z.object({
        "id": z.string(),
        "value": z.string(),
        "label": z.string()
      })),
      "intro": z.object({
        "pullquote": z.string(),
        "body": z.string()
      }),
      "vision": z.object({
        "vision_title": z.string(),
        "vision_text": z.string(),
        "mission_title": z.string(),
        "mission_text": z.string(),
        "objectives_title": z.string(),
        "objectives_text": z.string()
      }),
      "initiatives": z.array(z.object({
        "id": z.string(),
        "number": z.string(),
        "title": z.string(),
        "description": z.string()
      })),
      "network": z.object({
        "heading": z.string(),
        "body": z.string(),
        "cta": z.string()
      }),
      "governance": z.object({
        "heading": z.string(),
        "subheading": z.string(),
        "leaders": z.array(z.object({
          "id": z.string(),
          "title": z.string(),
          "name": z.string(),
          "description": z.string()
        }))
      }),
      "membership": z.object({
        "heading": z.string(),
        "body": z.string(),
        "cta": z.string()
      }),
      "news": z.object({
        "heading": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "category": z.string(),
          "date": z.string(),
          "title": z.string(),
          "excerpt": z.string()
        })),
        "cta": z.string()
      }),
      "contact": z.object({
        "address": z.string(),
        "email": z.string(),
        "phone": z.string(),
        "cta": z.string()
      })
    }),
    about: z.object({
      "hero": z.object({
        "label": z.string(),
        "headline": z.string(),
        "subheadline": z.string()
      }),
      "intro": z.object({
        "heading": z.string(),
        "body": z.array(z.object({
          "id": z.string(),
          "text": z.string()
        }))
      }),
      "philosophy": z.object({
        "heading": z.string(),
        "pullquote": z.string(),
        "body": z.array(z.object({
          "id": z.string(),
          "text": z.string()
        }))
      }),
      "purpose": z.object({
        "heading": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "title": z.string(),
          "description": z.string()
        }))
      }),
      "history": z.object({
        "heading": z.string(),
        "note": z.string(),
        "milestones": z.array(z.object({
          "id": z.string(),
          "year": z.string(),
          "event": z.string(),
          "detail": z.string()
        }))
      }),
      "approach": z.object({
        "heading": z.string(),
        "subheading": z.string(),
        "principles": z.array(z.object({
          "id": z.string(),
          "number": z.string(),
          "title": z.string(),
          "description": z.string()
        }))
      }),
      "cta": z.object({
        "heading": z.string(),
        "links": z.array(z.object({
          "id": z.string(),
          "label": z.string(),
          "href": z.string()
        }))
      })
    }),
    vision_mission: z.object({
      "hero": z.object({
        "label": z.string(),
        "headline": z.string(),
        "subheadline": z.string()
      }),
      "vision": z.object({
        "label": z.string(),
        "heading": z.string(),
        "statement": z.string(),
        "elaboration": z.array(z.object({
          "id": z.string(),
          "text": z.string()
        }))
      }),
      "mission": z.object({
        "label": z.string(),
        "heading": z.string(),
        "statement": z.string(),
        "elaboration": z.array(z.object({
          "id": z.string(),
          "text": z.string()
        }))
      }),
      "objectives": z.object({
        "label": z.string(),
        "heading": z.string(),
        "intro": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "number": z.string(),
          "title": z.string(),
          "description": z.string()
        }))
      }),
      "philosophy": z.object({
        "label": z.string(),
        "heading": z.string(),
        "pullquote": z.string(),
        "body": z.array(z.object({
          "id": z.string(),
          "text": z.string()
        }))
      }),
      "commitment": z.object({
        "heading": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "title": z.string(),
          "description": z.string()
        }))
      }),
      "cta": z.object({
        "heading": z.string(),
        "links": z.array(z.object({
          "id": z.string(),
          "label": z.string(),
          "href": z.string()
        }))
      })
    }),
    governance: z.object({
      "hero": z.object({
        "label": z.string(),
        "headline": z.string(),
        "subheadline": z.string()
      }),
      "overview": z.object({
        "heading": z.string(),
        "body": z.array(z.object({
          "id": z.string(),
          "text": z.string()
        }))
      }),
      "executive": z.object({
        "label": z.string(),
        "heading": z.string(),
        "note": z.string(),
        "members": z.array(z.object({
          "id": z.string(),
          "title": z.string(),
          "name": z.string(),
          "qualification": z.string(),
          "profile": z.string()
        }))
      }),
      "general_body": z.object({
        "label": z.string(),
        "heading": z.string(),
        "body": z.array(z.object({
          "id": z.string(),
          "text": z.string()
        }))
      }),
      "committees": z.object({
        "label": z.string(),
        "heading": z.string(),
        "intro": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "title": z.string(),
          "description": z.string()
        }))
      }),
      "advisory": z.object({
        "label": z.string(),
        "heading": z.string(),
        "body": z.array(z.object({
          "id": z.string(),
          "text": z.string()
        })),
        "note": z.string()
      }),
      "principles": z.object({
        "heading": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "title": z.string(),
          "description": z.string()
        }))
      })
    }),
    org_structure: z.object({
      "hero": z.object({
        "label": z.string(),
        "headline": z.string(),
        "subheadline": z.string()
      }),
      "overview": z.object({
        "heading": z.string(),
        "body": z.array(z.object({
          "id": z.string(),
          "text": z.string()
        }))
      }),
      "tiers": z.array(z.object({
        "id": z.string(),
        "number": z.string(),
        "label": z.string(),
        "heading": z.string(),
        "description": z.string(),
        "units": z.array(z.object({
          "id": z.string(),
          "name": z.string(),
          "role": z.string()
        }))
      })),
      "departments": z.object({
        "label": z.string(),
        "heading": z.string(),
        "intro": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "title": z.string(),
          "description": z.string()
        }))
      }),
      "note": z.string()
    }),
    initiatives: z.object({
      "hero": z.object({
        "label": z.string(),
        "headline": z.string(),
        "subheadline": z.string()
      }),
      "overview": z.object({
        "heading": z.string(),
        "body": z.array(z.object({
          "id": z.string(),
          "text": z.string()
        }))
      }),
      "categories": z.array(z.object({
        "id": z.string(),
        "number": z.string(),
        "label": z.string(),
        "heading": z.string(),
        "description": z.string(),
        "programmes": z.array(z.object({
          "id": z.string(),
          "name": z.string(),
          "detail": z.string()
        }))
      })),
      "note": z.string(),
      "cta": z.object({
        "heading": z.string(),
        "body": z.string(),
        "links": z.array(z.object({
          "id": z.string(),
          "label": z.string(),
          "href": z.string()
        }))
      })
    }),
    membership: z.object({
      "hero": z.object({
        "label": z.string(),
        "headline": z.string(),
        "subheadline": z.string()
      }),
      "overview": z.object({
        "heading": z.string(),
        "body": z.array(z.object({
          "id": z.string(),
          "text": z.string()
        }))
      }),
      "categories": z.object({
        "label": z.string(),
        "heading": z.string(),
        "intro": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "number": z.string(),
          "title": z.string(),
          "subtitle": z.string(),
          "description": z.string(),
          "eligibility": z.array(z.object({
            "id": z.string(),
            "text": z.string()
          }))
        }))
      }),
      "benefits": z.object({
        "label": z.string(),
        "heading": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "title": z.string(),
          "description": z.string()
        }))
      }),
      "process": z.object({
        "label": z.string(),
        "heading": z.string(),
        "steps": z.array(z.object({
          "id": z.string(),
          "number": z.string(),
          "title": z.string(),
          "description": z.string()
        }))
      }),
      "enquirySection": z.object({
        "label": z.string(),
        "heading": z.string(),
        "body": z.string()
      }),
      "note": z.string()
    }),
    network: z.object({
      "hero": z.object({
        "label": z.string(),
        "headline": z.string(),
        "subheadline": z.string()
      }),
      "overview": z.object({
        "heading": z.string(),
        "body": z.array(z.object({
          "id": z.string(),
          "text": z.string()
        }))
      }),
      "networkStats": z.array(z.object({
        "id": z.string(),
        "number": z.string(),
        "label": z.string()
      })),
      "institutionTypes": z.object({
        "label": z.string(),
        "heading": z.string(),
        "intro": z.string(),
        "types": z.array(z.object({
          "id": z.string(),
          "number": z.string(),
          "title": z.string(),
          "description": z.string()
        }))
      }),
      "partnerships": z.object({
        "label": z.string(),
        "heading": z.string(),
        "body": z.string(),
        "types": z.array(z.object({
          "id": z.string(),
          "title": z.string(),
          "description": z.string()
        }))
      }),
      "hostInstitutions": z.object({
        "label": z.string(),
        "heading": z.string(),
        "body": z.string(),
        "benefits": z.array(z.object({
          "id": z.string(),
          "text": z.string()
        }))
      }),
      "enquirySection": z.object({
        "label": z.string(),
        "heading": z.string(),
        "body": z.string()
      }),
      "note": z.string()
    }),
    news: z.object({
      "hero": z.object({
        "label": z.string(),
        "headline": z.string(),
        "subheadline": z.string()
      }),
      "categories": z.array(z.object({
        "id": z.string(),
        "label": z.string()
      })),
      "featured": z.object({
        "tag": z.string(),
        "date": z.string(),
        "headline": z.string(),
        "summary": z.string(),
        "readMoreLabel": z.string()
      }),
      "items": z.array(z.object({
        "id": z.string(),
        "tag": z.string(),
        "date": z.string(),
        "headline": z.string(),
        "summary": z.string(),
        "featured": z.boolean()
      })),
      "subscribeSection": z.object({
        "label": z.string(),
        "heading": z.string(),
        "body": z.string()
      }),
      "note": z.string()
    }),
    contact: z.object({
      "hero": z.object({
        "label": z.string(),
        "headline": z.string(),
        "subheadline": z.string()
      }),
      "officeDetails": z.object({
        "label": z.string(),
        "heading": z.string(),
        "address": z.object({
          "line1": z.string(),
          "line2": z.string(),
          "country": z.string()
        }),
        "email": z.string(),
        "phone": z.string(),
        "hours": z.string()
      }),
      "enquiryTypes": z.array(z.object({
        "id": z.string(),
        "label": z.string(),
        "description": z.string()
      })),
      "formSection": z.object({
        "label": z.string(),
        "heading": z.string(),
        "body": z.string()
      }),
      "note": z.string()
    })
  }
};
export type Schemas = typeof schemas;