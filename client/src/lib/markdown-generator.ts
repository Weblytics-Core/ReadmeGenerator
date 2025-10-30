import type { ReadmeProfile } from "@shared/schema";

export function generateMarkdown(profile: ReadmeProfile): string {
  const sections: string[] = [];

  if (profile.template === "minimal") {
    sections.push(generateMinimalTemplate(profile));
  } else if (profile.template === "detailed") {
    sections.push(generateDetailedTemplate(profile));
  } else if (profile.template === "creative") {
    sections.push(generateCreativeTemplate(profile));
  }

  return sections.join("\n\n");
}

function generateMinimalTemplate(profile: ReadmeProfile): string {
  const parts: string[] = [];

  parts.push(`# ${profile.name}`);

  if (profile.tagline) {
    parts.push(`### ${profile.tagline}`);
  }

  if (profile.bio) {
    parts.push(`\n${profile.bio}`);
  }

  if (profile.location) {
    parts.push(`\n**Location:** ${profile.location}`);
  }

  if (profile.skills.length > 0) {
    parts.push(`\n## Skills\n`);
    parts.push(profile.skills.map(skill => `\`${skill}\``).join(" • "));
  }

  if (profile.socialLinks && Object.values(profile.socialLinks).some(v => v)) {
    parts.push("\n## Connect With Me\n");
    const links: string[] = [];
    
    if (profile.socialLinks.github) {
      links.push(`[![GitHub](https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/${profile.socialLinks.github})`);
    }
    if (profile.socialLinks.linkedin) {
      links.push(`[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://linkedin.com/in/${profile.socialLinks.linkedin})`);
    }
    if (profile.socialLinks.twitter) {
      links.push(`[![Twitter](https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white)](https://twitter.com/${profile.socialLinks.twitter})`);
    }
    if (profile.socialLinks.website) {
      links.push(`[![Website](https://img.shields.io/badge/Website-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white)](${profile.socialLinks.website})`);
    }
    
    parts.push(links.join(" "));
  }

  return parts.join("\n");
}

function generateDetailedTemplate(profile: ReadmeProfile): string {
  const parts: string[] = [];

  parts.push(`<h1 align="center">Hi, I'm ${profile.name}</h1>`);

  if (profile.tagline) {
    parts.push(`<h3 align="center">${profile.tagline}</h3>`);
  }

  if (profile.bio) {
    parts.push(`\n${profile.bio}`);
  }

  if (profile.location) {
    parts.push(`\n- I'm based in **${profile.location}**`);
  }

  if (profile.skills.length > 0) {
    parts.push(`\n## Technologies & Tools\n`);
    const skillBadges = profile.skills.map(skill => {
      const skillSlug = skill.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "");
      return `![${skill}](https://img.shields.io/badge/-${encodeURIComponent(skill)}-05122A?style=flat&logo=${skillSlug})`;
    });
    parts.push(skillBadges.join(" "));
  }

  if (profile.githubUsername) {
    const githubStats: string[] = [];
    
    if (profile.showStats || profile.showStreak || profile.showTopLanguages) {
      parts.push(`\n## GitHub Stats\n`);
      
      if (profile.showStats) {
        githubStats.push(`![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${profile.githubUsername}&show_icons=true&theme=radical&count_private=true)`);
      }
      
      if (profile.showStreak) {
        githubStats.push(`![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=${profile.githubUsername}&theme=radical)`);
      }
      
      if (profile.showTopLanguages) {
        githubStats.push(`![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.githubUsername}&layout=compact&theme=radical)`);
      }
      
      if (profile.showProfileViews) {
        githubStats.push(`![Profile Views](https://komarev.com/ghpvc/?username=${profile.githubUsername}&style=flat-square&color=blueviolet)`);
      }
      
      if (profile.showTrophies) {
        githubStats.push(`\n## 🏆 GitHub Trophies\n[![trophy](https://github-profile-trophy.vercel.app/?username=${profile.githubUsername}&theme=radical&row=2&column=4)](https://github.com/ryo-ma/github-profile-trophy)`);
      }
      
      parts.push(githubStats.join('\n\n'));
    }
  }

  if (profile.socialLinks && Object.values(profile.socialLinks).some(v => v)) {
    parts.push("\n## Connect With Me\n");
    const links: string[] = [];
    
    if (profile.socialLinks.github) {
      links.push(`<a href="https://github.com/${profile.socialLinks.github}"><img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=github&logoColor=white"/></a>`);
    }
    if (profile.socialLinks.linkedin) {
      links.push(`<a href="https://linkedin.com/in/${profile.socialLinks.linkedin}"><img src="https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white"/></a>`);
    }
    if (profile.socialLinks.twitter) {
      links.push(`<a href="https://twitter.com/${profile.socialLinks.twitter}"><img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white"/></a>`);
    }
    if (profile.socialLinks.youtube) {
      links.push(`<a href="https://youtube.com/@${profile.socialLinks.youtube}"><img src="https://img.shields.io/badge/YouTube-FF0000?style=for-the-badge&logo=youtube&logoColor=white"/></a>`);
    }
    if (profile.socialLinks.instagram) {
      links.push(`<a href="https://instagram.com/${profile.socialLinks.instagram}"><img src="https://img.shields.io/badge/Instagram-E4405F?style=for-the-badge&logo=instagram&logoColor=white"/></a>`);
    }
    if (profile.socialLinks.website) {
      links.push(`<a href="${profile.socialLinks.website}"><img src="https://img.shields.io/badge/Website-4285F4?style=for-the-badge&logo=google-chrome&logoColor=white"/></a>`);
    }
    
    parts.push(`<p align="center">\n${links.join("\n")}\n</p>`);
  }

  return parts.join("\n");
}

function generateCreativeTemplate(profile: ReadmeProfile): string {
  const parts: string[] = [];

  // Hero Section with Gradient Background
  parts.push(`<div align="center">\n`);
  parts.push(`<h1 align="center">👋 Hello, I'm ${profile.name}</h1>\n`);
  
  if (profile.tagline) {
    parts.push(`<p align="center" style="font-size: 1.2rem; color: #6c757d;">${profile.tagline}</p>\n`);
  }
  
  // Social Buttons
  if (profile.socialLinks && Object.values(profile.socialLinks).some(v => v)) {
    parts.push(`<div align="center" style="display: flex; flex-wrap: wrap; justify-content: center; gap: 10px; margin: 1.5rem 0;">`);
    
    const socialButton = (url: string, label: string, icon: string, color: string, hoverColor: string) => {
      return `<a href="${url}" target="_blank" 
        style="
          display: inline-flex;
          align-items: center;
          justify-content: center;
          padding: 0.6rem 1.2rem;
          background: ${color};
          color: white;
          border-radius: 8px;
          text-decoration: none;
          font-weight: 500;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          border: none;
          cursor: pointer;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        "
        onmouseover="this.style.background='${hoverColor}'; this.style.transform='translateY(-2px)'; this.style.boxShadow='0 4px 8px rgba(0,0,0,0.15)'"
        onmouseout="this.style.background='${color}'; this.style.transform='translateY(0)'; this.style.boxShadow='0 2px 5px rgba(0,0,0,0.1)'"
      >
        <span style="margin-right: 6px; display: flex; align-items: center;">${icon}</span>
        <span>${label}</span>
      </a>`;
    };
    
    if (profile.socialLinks.github) {
      parts.push(socialButton(
        `https://github.com/${profile.socialLinks.github}`,
        'GitHub',
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="white" style="margin-right: 6px;"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>',
        '#181717',
        '#333333'
      ));
    }
    
    if (profile.socialLinks.linkedin) {
      parts.push(socialButton(
        `https://linkedin.com/in/${profile.socialLinks.linkedin}`,
        'LinkedIn',
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>',
        '#0A66C2',
        '#0D5A9E'
      ));
    }
    
    if (profile.socialLinks.twitter) {
      parts.push(socialButton(
        `https://twitter.com/${profile.socialLinks.twitter}`,
        'Twitter',
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>',
        '#1DA1F2',
        '#1A8CD8'
      ));
    }
    
    if (profile.socialLinks.website) {
      parts.push(socialButton(
        profile.socialLinks.website.startsWith('http') ? profile.socialLinks.website : `https://${profile.socialLinks.website}`,
        'Website',
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-2 19l1.5-5h-4.5l7-9-1.5 5h4.5l-7 9z"/></svg>',
        '#4285F4',
        '#3367D6'
      ));
    }
    
    if (profile.socialLinks.youtube) {
      parts.push(socialButton(
        `https://youtube.com/@${profile.socialLinks.youtube}`,
        'YouTube',
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"/></svg>',
        '#FF0000',
        '#E50000'
      ));
    }
    
    if (profile.socialLinks.instagram) {
      parts.push(socialButton(
        `https://instagram.com/${profile.socialLinks.instagram}`,
        'Instagram',
        '<svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>',
        '#E4405F',
        '#D02E4D'
      ));
    }
    
    parts.push(`</div>\n`);
  }
  
  parts.push(`</div>\n`);

  // Profile Views Section
  if (profile.showProfileViews && profile.githubUsername) {
    parts.push(`<p align="center" style="margin: 1.5rem 0;">\n  <img height="25" src="https://komarev.com/ghpvc/?username=${profile.githubUsername}&style=for-the-badge&color=blueviolet" alt="Profile Views" />\n</p>\n`);
  }

  // About Me Section
  if (profile.bio) {
    parts.push(`## 🎯 About Me\n`);
    parts.push(`<p style="
      margin: 1.25rem 0;
      line-height: 1.7;
      color: #374151;
      font-size: 1.05rem;
    ">${profile.bio}</p>\n`);
  }

  // Tech Stack Section with Categories
  if (profile.skills.length > 0) {
    parts.push(`\n## 🛠️ Tech Stack\n`);
    
    // Group skills by category if we can detect them
    const skillCategories: Record<string, string[]> = {
      'Frontend': [],
      'Backend': [],
      'Database': [],
      'DevOps': [],
      'Other': []
    };
    
    // Simple categorization (this could be enhanced with a more sophisticated mapping)
    profile.skills.forEach(skill => {
      const lowerSkill = skill.toLowerCase();
      if (['react', 'vue', 'angular', 'svelte', 'html', 'css', 'javascript', 'typescript', 'next', 'nuxt', 'gatsby'].some(s => lowerSkill.includes(s))) {
        skillCategories['Frontend'].push(skill);
      } else if (['node', 'express', 'django', 'flask', 'spring', 'ruby', 'php', 'laravel', 'nest', 'fastapi'].some(s => lowerSkill.includes(s))) {
        skillCategories['Backend'].push(skill);
      } else if (['sql', 'mysql', 'postgres', 'mongodb', 'redis', 'firebase', 'dynamodb', 'prisma', 'typeorm'].some(s => lowerSkill.includes(s))) {
        skillCategories['Database'].push(skill);
      } else if (['docker', 'kubernetes', 'aws', 'azure', 'gcp', 'ci/cd', 'github actions', 'gitlab', 'jenkins'].some(s => lowerSkill.includes(s))) {
        skillCategories['DevOps'].push(skill);
      } else {
        skillCategories['Other'].push(skill);
      }
    });
    
    // Generate skill sections
    Object.entries(skillCategories).forEach(([category, skills]) => {
      if (skills.length > 0) {
        parts.push(`\n### ${category}\n`);
        parts.push(`<div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin: 0.5rem 0 1.5rem 0;">`);
        
        const skillBadges = skills.map(skill => {
          const skillSlug = skill.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "");
          return `<img src="https://img.shields.io/badge/-${encodeURIComponent(skill)}-4A5568?style=for-the-badge&logo=${skillSlug}&logoColor=white" alt="${skill}" />`;
        });
        
        parts.push(skillBadges.join("\n"));
        parts.push(`</div>`);
      }
    });
  }

  // GitHub Stats Section
  if (profile.githubUsername) {
    const githubStats: string[] = [];
    
    if (profile.showStats || profile.showStreak || profile.showTopLanguages) {
      parts.push(`\n## 📊 GitHub Stats\n`);
      parts.push(`<div align="center" style="display: flex; flex-wrap: wrap; gap: 1rem; justify-content: center; margin: 1rem 0;">`);
      
      if (profile.showStats) {
        githubStats.push(`<img height="180em" src="https://github-readme-stats.vercel.app/api?username=${profile.githubUsername}&show_icons=true&theme=radical&include_all_commits=true&count_private=true&hide_border=true" alt="${profile.githubUsername}'s GitHub Stats" />`);
      }
      
      if (profile.showStreak) {
        githubStats.push(`<img height="180em" src="https://github-readme-streak-stats.herokuapp.com/?user=${profile.githubUsername}&theme=radical&hide_border=true" alt="${profile.githubUsername}'s GitHub Streak" />`);
      }
      
      if (profile.showTopLanguages) {
        githubStats.push(`<img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.githubUsername}&layout=compact&theme=radical&hide_border=true" alt="${profile.githubUsername}'s Top Languages" />`);
      }
      
      // Profile views moved to top, before About Me section
      
      parts.push(githubStats.join('\n'));
      parts.push(`</div>`);
    }
    
    // GitHub Trophies
    if (profile.showTrophies) {
      parts.push(`\n## 🏆 GitHub Trophies\n`);
      parts.push(`<div align="center">`);
      parts.push(`<img src="https://github-profile-trophy.vercel.app/?username=${profile.githubUsername}&theme=radical&no-frame=true&no-bg=true&row=2&column=4" alt="${profile.githubUsername}'s GitHub Trophies" />`);
      parts.push(`</div>`);
    }
    
    // GitHub Contribution Graph
    parts.push(`\n## 📈 GitHub Contribution Graph\n`);
    parts.push(`<div align="center">`);
    parts.push(`<img src="https://github-readme-activity-graph.vercel.app/graph?username=${profile.githubUsername}&theme=react-dark&bg_color=1a1b27&hide_border=true&area=true" alt="${profile.githubUsername}'s GitHub Activity Graph" />`);
    parts.push(`</div>`);
  }

  // Projects Section (moved down to combine with the styled version)

  // Custom Sections
  // Projects Section
  if (profile.showProjects && profile.projects && profile.projects.length > 0) {
    parts.push(`\n## 🚀 Projects\n`);
    
    const projectItems = profile.projects.map((project, index) => {
      const tags = project.tags && project.tags.length > 0 
        ? `\n  <div style="display: flex; flex-wrap: wrap; gap: 0.5rem; margin-top: 0.5rem;">${project.tags.map(tag => `<span style="background: #e9ecef; color: #495057; padding: 0.2rem 0.6rem; border-radius: 1rem; font-size: 0.8rem; font-weight: 500;">${tag}</span>`).join('')}</div>` 
        : '';
      
      const projectLink = project.url 
        ? `🔗 [${project.name}](${project.url})` 
        : `📌 ${project.name}`;
      
      return `### ${projectLink}  
<div style="background: #f8f9fa; padding: 1rem; border-radius: 8px; margin: 0.5rem 0 1.5rem 0;">
  ${project.description}${tags}
</div>`;
    });
    
    parts.push(projectItems.join('\n\n'));
  }

  // Ask Me About Section
  if (profile.showAskMeAbout && profile.askMeAbout && profile.askMeAbout.length > 0) {
    parts.push(`\n## 💬 Ask Me About\n`);
    parts.push(`<div style="background: #f8f9fa; padding: 1.5rem; border-radius: 10px; margin: 1rem 0; border-left: 4px solid #10b981;">\n`);
    
    const askMeAboutItems = profile.askMeAbout.map(item => 
      `- ${item}`
    );
    
    parts.push(askMeAboutItems.join('\n'));
    parts.push(`\n</div>`);
  }

  // Contact Information Section
  if (profile.showContactInfo && profile.contactInfo) {
    const { email, website, blog } = profile.contactInfo;
    const contactItems: string[] = [];
    
    // Helper function to safely extract domain from URL
    const getDomain = (url: string): string => {
      try {
        const urlObj = new URL(url.startsWith('http') ? url : `https://${url}`);
        return urlObj.hostname.replace('www.', '');
      } catch (e) {
        return url;
      }
    };
    
    // Contact item template
    const contactItem = (icon: string, label: string, link: string, text: string) => 
      `<div style="display: flex; align-items: center; margin-bottom: 1rem;">
        <span style="margin-right: 1rem; font-size: 1.2rem;">${icon}</span>
        <div style="line-height: 1.6;">
          <p style="margin: 0; color: #2d3748; font-size: 1.05rem;">
            <strong>${label}:</strong> 
            <a href="${link}" 
               target="_blank" 
               rel="noopener noreferrer"
               style="
                 color: #3b82f6;
                 text-decoration: none;
                 transition: color 0.2s ease;
               "
               onmouseover="this.style.color='#2563eb'"
               onmouseout="this.style.color='#3b82f6'"
            >
              ${text}
            </a>
          </p>
        </div>
      </div>`;
    
    if (email) {
      contactItems.push(contactItem('✉️', 'Email', `mailto:${email}`, email));
    }
    
    if (website && website.trim()) {
      const displayText = getDomain(website);
      const fullUrl = website.startsWith('http') ? website : `https://${website}`;
      contactItems.push(contactItem('🌐', 'Website', fullUrl, displayText));
    }
    
    if (blog && blog.trim()) {
      const displayText = getDomain(blog);
      const fullUrl = blog.startsWith('http') ? blog : `https://${blog}`;
      contactItems.push(contactItem('✍️', 'Blog', fullUrl, displayText));
    }
    
    if (contactItems.length > 0) {
      parts.push(`\n## 📫 How to Reach Me\n`);
      parts.push(`<div style="
        background: linear-gradient(135deg, #f8f9fa 0%, #f1f3f9 100%);
        padding: 1.8rem 2rem;
        border-radius: 12px;
        margin: 1.5rem 0;
        border-left: 4px solid #3b82f6;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        transition: transform 0.2s ease, box-shadow 0.2s ease;
      ">
        ${contactItems.join('\n')}
      </div>`);
    }
  }

  // Custom Sections
  if (profile.customSections.length > 0) {
    profile.customSections.forEach(section => {
      parts.push(`\n## ${section.title}\n`);
      parts.push(`<div style="background: #f8f9fa; padding: 1.5rem; border-radius: 10px; margin: 1rem 0;">\n`);
      parts.push(`${section.content}\n`);
      parts.push(`</div>`);
    });
  }
  
  // Footer
  parts.push(`\n---\n`);
  parts.push(`<div align="center" style="margin-top: 2rem;">\n`);
  parts.push(`<p style="font-size: 0.9rem; color: #6b7280;">✨ Thanks for visiting my profile! ✨</p>\n`);
  parts.push(`</div>`);

  return parts.join("\n");
}
