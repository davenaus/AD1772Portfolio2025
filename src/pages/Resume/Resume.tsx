import React from 'react';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    --blue1: #0f1113;
    --blue2: #17191c;
    --blue3: #212326;
    --blue4: #282a2d;
    --blue5: #2f3135;
    --blue6: #383b3e;
    --blue7: #46484c;
    --blue8: #5f6165;
    --blue9: #fafcff;
    --blue10: #f1f3f6;
    --blue11: #b1b4b8;
    --blue12: #eceef1;
  }

  body {
    font-family: 'Poppins', sans-serif;
    background-color: var(--blue1);
    color: var(--blue12);
    min-height: 100vh;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  @media print {
    body {
      padding: 0;
      background: white;
    }
  }
`;

const Container = styled.div`
    width: 8.5in;
    min-height: 11in;
    background: var(--blue2);
    color: var(--blue12);
    padding: 1in;
    box-shadow: 0 0 20px rgba(0,0,0,0.2);
    position: relative;
    border-radius: 16px;

  @media print {
    box-shadow: none;
  }
`;

const Header = styled.header`
  margin-bottom: 2rem;
  border-bottom: 2px solid var(--blue3);
  padding-bottom: 1rem;
`;

const ProfileSection = styled.div`
  margin-bottom: 1rem;
`;

const Name = styled.h1`
  font-size: 2.5rem;
  color: var(--blue9);
  margin-bottom: 0.5rem;
`;

const Title = styled.h2`
  font-size: 1.25rem;
  color: var(--blue11);
`;

const ContactSection = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
`;

const ContactItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--blue11);

  i {
    color: var(--blue9);
    font-size: 1.2rem;
  }
`;

const Section = styled.section`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h3`
  font-size: 1.25rem;
  color: var(--blue9);
  margin-bottom: 1rem;
  border-bottom: 1px solid var(--blue3);
  padding-bottom: 0.5rem;
`;

const SectionContent = styled.div`
  color: var(--blue11);
  line-height: 1.6;
`;

const SkillGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
`;

const SkillCategory = styled.div`
  background: var(--blue3);
  padding: 1rem;
  border-radius: 8px;
  border: 1px solid var(--blue3);
`;

const SkillTitle = styled.h4`
  color: var(--blue9);
  margin-bottom: 0.5rem;
`;

const SkillList = styled.ul`
  list-style: none;
`;

const Skill = styled.li`
  color: var(--blue11);
  margin-bottom: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;

  &:before {
    content: "•";
    color: var(--blue9);
  }
`;

const ExperienceGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ExperienceItem = styled.div`
  background: var(--blue3);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--blue3);
`;

const ExperienceHeader = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
`;

const ExperienceTitle = styled.h4`
  color: var(--blue9);
  font-size: 1.1rem;
  font-weight: 500;
`;

const CompanyName = styled.div`
  color: var(--blue11);
  font-size: 0.875rem;
`;

const ExperienceDate = styled.div`
  color: var(--blue11);
  font-size: 0.875rem;
`;

const ExperienceDescription = styled.div`
  color: var(--blue11);
  white-space: pre-line;
  line-height: 1.6;
`;

const ProjectGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2rem;
`;

const ProjectItem = styled.div`
  background: var(--blue3);
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid var(--blue3);
`;

const ProjectTitle = styled.h4`
  color: var(--blue9);
  margin-bottom: 0.5rem;
  font-size: 1.1rem;
`;

const ProjectDescription = styled.div`
  color: var(--blue11);
  font-size: 0.875rem;
  line-height: 1.6;
`;

const ExportButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  padding: 0.75rem 1.5rem;
  background: var(--blue3);
  color: var(--blue9);
  border: none;
  border-radius: 8px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: all 0.2s ease;
  font-family: 'Poppins', sans-serif;

  &:hover {
    background: var(--blue4);
    transform: translateY(-2px);
  }

  i {
    font-size: 1.25rem;
  }

  @media print {
    display: none;
  }
`;

const Resume: React.FC = () => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <GlobalStyle />
      <Container id="resume">
        <Header>
          <ProfileSection>
            <Name>Austin Davenport</Name>
            <Title>Video Editor & Developer</Title>
          </ProfileSection>
          <ContactSection>
            <ContactItem>
              <i className='bx bx-envelope'></i>
              austindavenport000@gmail.com
            </ContactItem>
            <ContactItem>
              <i className='bx bx-globe'></i>
              austindavenport.com
            </ContactItem>
            <ContactItem>
              <i className='bx bxl-youtube'></i>
              @AustinDavenport
            </ContactItem>
          </ContactSection>
        </Header>

        <Section>
          <SectionTitle>Professional Summary</SectionTitle>
          <SectionContent>
            Enthusiastic professional with extensive experience in Studio/Live Video Production, Editing, and Post-Production. 
            Specializing in creating high-quality video content and developing tools for content creators. Proven track record 
            in team leadership and project management.
          </SectionContent>
        </Section>

        <Section>
          <SectionTitle>Technical Skills</SectionTitle>
          <SkillGrid>
            <SkillCategory>
              <SkillTitle>Video Editing & Production</SkillTitle>
              <SkillList>
                <Skill>Adobe Premiere Pro</Skill>
                <Skill>Adobe After Effects</Skill>
                <Skill>DaVinci Resolve</Skill>
                <Skill>Final Cut Pro</Skill>
                <Skill>Live Production</Skill>
              </SkillList>
            </SkillCategory>
            <SkillCategory>
              <SkillTitle>Development</SkillTitle>
              <SkillList>
                <Skill>React.js</Skill>
                <Skill>TypeScript</Skill>
                <Skill>Node.js</Skill>
                <Skill>Python</Skill>
                <Skill>Web Development</Skill>
              </SkillList>
            </SkillCategory>
          </SkillGrid>
        </Section>

        <Section>
          <SectionTitle>Work Experience</SectionTitle>
          <ExperienceGrid>
            <ExperienceItem>
              <ExperienceHeader>
                <div>
                  <ExperienceTitle>Assistant Post-Production Manager & Video Editor</ExperienceTitle>
                  <CompanyName>The Daily Wire</CompanyName>
                </div>
                <ExperienceDate>July 2024 - Present</ExperienceDate>
              </ExperienceHeader>
              <ExperienceDescription>
                • Lead a team of editors for "The Comments Section with Brett Cooper" (4M+ subscribers){'\n'}
                • Oversee all aspects of post-production, from footage management to episode delivery{'\n'}
                • Implement efficient workflows and best practices across departments{'\n'}
                • Coordinate between Marketing, Ads, and Production teams{'\n'}
                • Ensure timely delivery while maintaining high-quality standards
              </ExperienceDescription>
            </ExperienceItem>

            <ExperienceItem>
              <ExperienceHeader>
                <div>
                  <ExperienceTitle>Video Editor</ExperienceTitle>
                  <CompanyName>The Daily Wire</CompanyName>
                </div>
                <ExperienceDate>Aug 2023 - July 2024</ExperienceDate>
              </ExperienceHeader>
              <ExperienceDescription>
                • Lead editor for Brett Cooper's spin-off show 'Off The Clock'{'\n'}
                • Created content for multiple platforms including YouTube, Facebook, Twitter{'\n'}
                • Managed content distribution across Snapchat, Rumble, and TikTok{'\n'}
                • Maintained consistent quality and branding across all platforms
              </ExperienceDescription>
            </ExperienceItem>

            <ExperienceItem>
              <ExperienceHeader>
                <div>
                  <ExperienceTitle>Social Media Video Editor</ExperienceTitle>
                  <CompanyName>The Daily Wire</CompanyName>
                </div>
                <ExperienceDate>Sep 2022 - Aug 2023</ExperienceDate>
              </ExperienceHeader>
              <ExperienceDescription>
                • Primary editor for "The Comment Section" daily show{'\n'}
                • Created original long and short-form content for social media{'\n'}
                • Optimized content for various platform requirements{'\n'}
                • Collaborated with social media team on content strategy
              </ExperienceDescription>
            </ExperienceItem>

            <ExperienceItem>
              <ExperienceHeader>
                <div>
                  <ExperienceTitle>Visual Media Coordinator</ExperienceTitle>
                  <CompanyName>One Church Home</CompanyName>
                </div>
                <ExperienceDate>Nov 2021 - Sep 2022</ExperienceDate>
              </ExperienceHeader>
              <ExperienceDescription>
                • Led a team of 20+ volunteers for weekly live production{'\n'}
                • Managed social media presence and content strategy{'\n'}
                • Oversaw lighting, rigging, sound, video, and live streaming{'\n'}
                • Created visual media content and handled graphic design{'\n'}
                • Coordinated studio and live video production
              </ExperienceDescription>
            </ExperienceItem>


            <ExperienceItem>
              <ExperienceHeader>
                <div>
                  <ExperienceTitle>Video Production Assistant</ExperienceTitle>
                  <CompanyName>City of Franklin Tennessee</CompanyName>
                </div>
                <ExperienceDate>Jun 2021 - Nov 2021</ExperienceDate>
              </ExperienceHeader>
              <ExperienceDescription>
                • Directed live meeting broadcasts for city government{'\n'}
                • Created and edited content for social media marketing{'\n'}
                • Operated studio equipment and managed broadcast quality{'\n'}
                • Collaborated with city departments on video content needs{'\n'}
                • Maintained strict broadcast standards and protocols
              </ExperienceDescription>
            </ExperienceItem>

            <ExperienceItem>
              <ExperienceHeader>
                <div>
                  <ExperienceTitle>Video Producer</ExperienceTitle>
                  <CompanyName>Williamson County Schools</CompanyName>
                </div>
                <ExperienceDate>Apr 2018 - May 2020</ExperienceDate>
              </ExperienceHeader>
              <ExperienceDescription>
                • Produced educational and promotional video content{'\n'}
                • Collaborated with teachers and staff on instructional videos{'\n'}
                • Managed video production projects from concept to delivery{'\n'}
                • Created content for school district communications{'\n'}
                • Implemented video production standards and guidelines
              </ExperienceDescription>
            </ExperienceItem>
          </ExperienceGrid>
        </Section>

        <Section>
          <SectionTitle>Projects & Tools</SectionTitle>
          <ProjectGrid>
            <ProjectItem>
              <ProjectTitle>Creator Tools Suite</ProjectTitle>
              <ProjectDescription>
                A comprehensive collection of web-based tools for content creators including analytics,
                thumbnail generation, and engagement optimization. Built with React and TypeScript.
              </ProjectDescription>
            </ProjectItem>
            <ProjectItem>
              <ProjectTitle>Production Automation Tools</ProjectTitle>
              <ProjectDescription>
                Custom automation solutions for video production workflows, increasing team efficiency
                and maintaining consistent quality across multiple projects.
              </ProjectDescription>
            </ProjectItem>
          </ProjectGrid>
        </Section>
      </Container>

      <ExportButton onClick={handlePrint}>
        <i className='bx bx-download'></i>
        Download PDF
      </ExportButton>
    </>
  );
};

export { Resume };