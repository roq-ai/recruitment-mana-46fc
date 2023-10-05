interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
  getQuoteUrl: string;
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['HR Manager'],
  customerRoles: [],
  tenantRoles: ['HR Manager', 'HR Team Member', 'Project Manager', 'Director', 'Technical Assessor'],
  tenantName: 'Company',
  applicationName: 'Recruitment Management System',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: ['Manage user data', 'Manage company data', 'Manage candidate data', 'Manage interview data'],
  getQuoteUrl: 'https://app.roq.ai/proposal/fc17d3ac-583c-4ebb-b2d7-e88da47808a0',
};
