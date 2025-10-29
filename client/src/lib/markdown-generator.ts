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
    parts.push(`\n## GitHub Stats\n`);
    
    if (profile.showStats) {
      parts.push(`![GitHub Stats](https://github-readme-stats.vercel.app/api?username=${profile.githubUsername}&show_icons=true&theme=radical)`);
    }
    
    if (profile.showStreak) {
      parts.push(`\n![GitHub Streak](https://github-readme-streak-stats.herokuapp.com/?user=${profile.githubUsername}&theme=radical)`);
    }
    
    if (profile.showTopLanguages) {
      parts.push(`\n![Top Languages](https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.githubUsername}&layout=compact&theme=radical)`);
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

  parts.push(`<div align="center">\n`);
  parts.push(`# ${profile.name}\n`);
  
  if (profile.tagline) {
    parts.push(`### ${profile.tagline}\n`);
  }
  
  parts.push(`</div>\n`);

  if (profile.bio) {
    parts.push(`## About Me\n\n${profile.bio}`);
  }

  if (profile.skills.length > 0) {
    parts.push(`\n## Tech Stack\n`);
    parts.push(`<div align="center">\n`);
    const skillBadges = profile.skills.map(skill => {
      const skillSlug = skill.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "");
      return `<img src="https://img.shields.io/badge/-${encodeURIComponent(skill)}-4A5568?style=for-the-badge&logo=${skillSlug}&logoColor=white" />`;
    });
    parts.push(skillBadges.join("\n"));
    parts.push(`\n</div>`);
  }

  if (profile.githubUsername) {
    parts.push(`\n## GitHub Activity\n`);
    parts.push(`<div align="center">\n`);
    
    if (profile.showStats) {
      parts.push(`<img src="https://github-readme-stats.vercel.app/api?username=${profile.githubUsername}&show_icons=true&theme=tokyonight&hide_border=true" />\n`);
    }
    
    if (profile.showStreak) {
      parts.push(`<img src="https://github-readme-streak-stats.herokuapp.com/?user=${profile.githubUsername}&theme=tokyonight&hide_border=true" />\n`);
    }
    
    if (profile.showTopLanguages) {
      parts.push(`<img src="https://github-readme-stats.vercel.app/api/top-langs/?username=${profile.githubUsername}&layout=compact&theme=tokyonight&hide_border=true" />\n`);
    }
    
    parts.push(`</div>`);
  }

  if (profile.customSections.length > 0) {
    profile.customSections.forEach(section => {
      parts.push(`\n## ${section.title}\n\n${section.content}`);
    });
  }

  if (profile.socialLinks && Object.values(profile.socialLinks).some(v => v)) {
    parts.push("\n## Let's Connect\n");
    parts.push(`<div align="center">\n`);
    const links: string[] = [];
    
    if (profile.socialLinks.github) {
      links.push(`<a href="https://github.com/${profile.socialLinks.github}"><img src="https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white"/></a>`);
    }
    if (profile.socialLinks.linkedin) {
      links.push(`<a href="https://linkedin.com/in/${profile.socialLinks.linkedin}"><img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white"/></a>`);
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
    
    parts.push(links.join(" "));
    parts.push(`\n</div>`);
  }

  return parts.join("\n");
}
