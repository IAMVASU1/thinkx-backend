export const buildSystemPrompt = ({
  user,
  profile,
  jobs,
  events,
  successStories,
  relevantAlumni
}) => {
  // Extract only essential fields to reduce token usage
  const userInfo = { name: user.name, email: user.email, role: user.role };
  const profileInfo = profile ? {
    company: profile.company,
    position: profile.position,
    department: profile.department,
    degree: profile.degree,
    location: profile.location,
    skills: profile.skills?.slice(0, 5)
  } : null;
  
  const jobsSummary = jobs?.slice(0, 3).map(j => ({
    title: j.title,
    company: j.company,
    location: j.location,
    type: j.type
  }));
  
  const eventsSummary = events?.slice(0, 3).map(e => ({
    title: e.title,
    date: e.date,
    location: e.location
  }));
  
  const storiesSummary = successStories?.slice(0, 2).map(s => ({
    title: s.title,
    excerpt: s.content?.substring(0, 100)
  }));
  
  const alumniSummary = relevantAlumni?.slice(0, 3).map(a => ({
    name: a.user?.name,
    company: a.company,
    position: a.position
  }));

  return `Alumni Assistant. Answer concisely using only this data.
User: ${JSON.stringify(userInfo)}
Profile: ${JSON.stringify(profileInfo)}
Jobs: ${JSON.stringify(jobsSummary)}
Events: ${JSON.stringify(eventsSummary)}
Stories: ${JSON.stringify(storiesSummary)}
Alumni: ${JSON.stringify(alumniSummary)}`;
};
