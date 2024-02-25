import type { Schema, Attribute } from '@strapi/strapi';

export interface AdminPermission extends Schema.CollectionType {
  collectionName: 'admin_permissions';
  info: {
    name: 'Permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    actionParameters: Attribute.JSON & Attribute.DefaultTo<{}>;
    subject: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    properties: Attribute.JSON & Attribute.DefaultTo<{}>;
    conditions: Attribute.JSON & Attribute.DefaultTo<[]>;
    role: Attribute.Relation<'admin::permission', 'manyToOne', 'admin::role'>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminUser extends Schema.CollectionType {
  collectionName: 'admin_users';
  info: {
    name: 'User';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    firstname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastname: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    username: Attribute.String;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.Private &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    registrationToken: Attribute.String & Attribute.Private;
    isActive: Attribute.Boolean &
      Attribute.Private &
      Attribute.DefaultTo<false>;
    roles: Attribute.Relation<'admin::user', 'manyToMany', 'admin::role'> &
      Attribute.Private;
    blocked: Attribute.Boolean & Attribute.Private & Attribute.DefaultTo<false>;
    preferedLanguage: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::user', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminRole extends Schema.CollectionType {
  collectionName: 'admin_roles';
  info: {
    name: 'Role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    code: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String;
    users: Attribute.Relation<'admin::role', 'manyToMany', 'admin::user'>;
    permissions: Attribute.Relation<
      'admin::role',
      'oneToMany',
      'admin::permission'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'admin::role', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface AdminApiToken extends Schema.CollectionType {
  collectionName: 'strapi_api_tokens';
  info: {
    name: 'Api Token';
    singularName: 'api-token';
    pluralName: 'api-tokens';
    displayName: 'Api Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    type: Attribute.Enumeration<['read-only', 'full-access', 'custom']> &
      Attribute.Required &
      Attribute.DefaultTo<'read-only'>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::api-token',
      'oneToMany',
      'admin::api-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminApiTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_api_token_permissions';
  info: {
    name: 'API Token Permission';
    description: '';
    singularName: 'api-token-permission';
    pluralName: 'api-token-permissions';
    displayName: 'API Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::api-token-permission',
      'manyToOne',
      'admin::api-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::api-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferToken extends Schema.CollectionType {
  collectionName: 'strapi_transfer_tokens';
  info: {
    name: 'Transfer Token';
    singularName: 'transfer-token';
    pluralName: 'transfer-tokens';
    displayName: 'Transfer Token';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    description: Attribute.String &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }> &
      Attribute.DefaultTo<''>;
    accessKey: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    lastUsedAt: Attribute.DateTime;
    permissions: Attribute.Relation<
      'admin::transfer-token',
      'oneToMany',
      'admin::transfer-token-permission'
    >;
    expiresAt: Attribute.DateTime;
    lifespan: Attribute.BigInteger;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface AdminTransferTokenPermission extends Schema.CollectionType {
  collectionName: 'strapi_transfer_token_permissions';
  info: {
    name: 'Transfer Token Permission';
    description: '';
    singularName: 'transfer-token-permission';
    pluralName: 'transfer-token-permissions';
    displayName: 'Transfer Token Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 1;
      }>;
    token: Attribute.Relation<
      'admin::transfer-token-permission',
      'manyToOne',
      'admin::transfer-token'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'admin::transfer-token-permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFile extends Schema.CollectionType {
  collectionName: 'files';
  info: {
    singularName: 'file';
    pluralName: 'files';
    displayName: 'File';
    description: '';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    alternativeText: Attribute.String;
    caption: Attribute.String;
    width: Attribute.Integer;
    height: Attribute.Integer;
    formats: Attribute.JSON;
    hash: Attribute.String & Attribute.Required;
    ext: Attribute.String;
    mime: Attribute.String & Attribute.Required;
    size: Attribute.Decimal & Attribute.Required;
    url: Attribute.String & Attribute.Required;
    previewUrl: Attribute.String;
    provider: Attribute.String & Attribute.Required;
    provider_metadata: Attribute.JSON;
    related: Attribute.Relation<'plugin::upload.file', 'morphToMany'>;
    folder: Attribute.Relation<
      'plugin::upload.file',
      'manyToOne',
      'plugin::upload.folder'
    > &
      Attribute.Private;
    folderPath: Attribute.String &
      Attribute.Required &
      Attribute.Private &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.file',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUploadFolder extends Schema.CollectionType {
  collectionName: 'upload_folders';
  info: {
    singularName: 'folder';
    pluralName: 'folders';
    displayName: 'Folder';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    pathId: Attribute.Integer & Attribute.Required & Attribute.Unique;
    parent: Attribute.Relation<
      'plugin::upload.folder',
      'manyToOne',
      'plugin::upload.folder'
    >;
    children: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.folder'
    >;
    files: Attribute.Relation<
      'plugin::upload.folder',
      'oneToMany',
      'plugin::upload.file'
    >;
    path: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::upload.folder',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesRelease extends Schema.CollectionType {
  collectionName: 'strapi_releases';
  info: {
    singularName: 'release';
    pluralName: 'releases';
    displayName: 'Release';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    releasedAt: Attribute.DateTime;
    scheduledAt: Attribute.DateTime;
    timezone: Attribute.String;
    actions: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToMany',
      'plugin::content-releases.release-action'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginContentReleasesReleaseAction
  extends Schema.CollectionType {
  collectionName: 'strapi_release_actions';
  info: {
    singularName: 'release-action';
    pluralName: 'release-actions';
    displayName: 'Release Action';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    type: Attribute.Enumeration<['publish', 'unpublish']> & Attribute.Required;
    entry: Attribute.Relation<
      'plugin::content-releases.release-action',
      'morphToOne'
    >;
    contentType: Attribute.String & Attribute.Required;
    locale: Attribute.String;
    release: Attribute.Relation<
      'plugin::content-releases.release-action',
      'manyToOne',
      'plugin::content-releases.release'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::content-releases.release-action',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsPermission
  extends Schema.CollectionType {
  collectionName: 'up_permissions';
  info: {
    name: 'permission';
    description: '';
    singularName: 'permission';
    pluralName: 'permissions';
    displayName: 'Permission';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    action: Attribute.String & Attribute.Required;
    role: Attribute.Relation<
      'plugin::users-permissions.permission',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.permission',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsRole extends Schema.CollectionType {
  collectionName: 'up_roles';
  info: {
    name: 'role';
    description: '';
    singularName: 'role';
    pluralName: 'roles';
    displayName: 'Role';
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    description: Attribute.String;
    type: Attribute.String & Attribute.Unique;
    permissions: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.permission'
    >;
    users: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToMany',
      'plugin::users-permissions.user'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.role',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginUsersPermissionsUser extends Schema.CollectionType {
  collectionName: 'up_users';
  info: {
    name: 'user';
    description: '';
    singularName: 'user';
    pluralName: 'users';
    displayName: 'User';
  };
  options: {
    draftAndPublish: false;
    timestamps: true;
  };
  attributes: {
    username: Attribute.String &
      Attribute.Required &
      Attribute.Unique &
      Attribute.SetMinMaxLength<{
        minLength: 3;
      }>;
    email: Attribute.Email &
      Attribute.Required &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    provider: Attribute.String;
    password: Attribute.Password &
      Attribute.Private &
      Attribute.SetMinMaxLength<{
        minLength: 6;
      }>;
    resetPasswordToken: Attribute.String & Attribute.Private;
    confirmationToken: Attribute.String & Attribute.Private;
    confirmed: Attribute.Boolean & Attribute.DefaultTo<false>;
    blocked: Attribute.Boolean & Attribute.DefaultTo<false>;
    role: Attribute.Relation<
      'plugin::users-permissions.user',
      'manyToOne',
      'plugin::users-permissions.role'
    >;
    businessId: Attribute.String;
    userType: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::users-permissions.user',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface PluginI18NLocale extends Schema.CollectionType {
  collectionName: 'i18n_locale';
  info: {
    singularName: 'locale';
    pluralName: 'locales';
    collectionName: 'locales';
    displayName: 'Locale';
    description: '';
  };
  options: {
    draftAndPublish: false;
  };
  pluginOptions: {
    'content-manager': {
      visible: false;
    };
    'content-type-builder': {
      visible: false;
    };
  };
  attributes: {
    name: Attribute.String &
      Attribute.SetMinMax<
        {
          min: 1;
          max: 50;
        },
        number
      >;
    code: Attribute.String & Attribute.Unique;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'plugin::i18n.locale',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAssetAsset extends Schema.CollectionType {
  collectionName: 'assets';
  info: {
    singularName: 'asset';
    pluralName: 'assets';
    displayName: 'Asset';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    assetUID: Attribute.String;
    description: Attribute.Text;
    isPublished: Attribute.Boolean;
    thumbnail: Attribute.Text;
    name: Attribute.String;
    qrcode: Attribute.String;
    parts: Attribute.Relation<
      'api::asset.asset',
      'oneToMany',
      'api::part.part'
    >;
    product: Attribute.Relation<
      'api::asset.asset',
      'manyToOne',
      'api::product.product'
    >;
    interactions: Attribute.Relation<
      'api::asset.asset',
      'manyToMany',
      'api::asset-interaction.asset-interaction'
    >;
    machines: Attribute.Relation<
      'api::asset.asset',
      'oneToOne',
      'api::digital-twin-factory-machine.digital-twin-factory-machine'
    >;
    preset: Attribute.Relation<
      'api::asset.asset',
      'manyToOne',
      'api::preset.preset'
    >;
    position_in_presets: Attribute.Relation<
      'api::asset.asset',
      'oneToMany',
      'api::position-in-preset.position-in-preset'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::asset.asset',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::asset.asset',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAssetInteractionAssetInteraction
  extends Schema.CollectionType {
  collectionName: 'asset_interactions';
  info: {
    singularName: 'asset-interaction';
    pluralName: 'asset-interactions';
    displayName: 'AssetInteraction';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    interaction: Attribute.Relation<
      'api::asset-interaction.asset-interaction',
      'manyToOne',
      'api::interaction.interaction'
    >;
    move: Attribute.Boolean;
    rotate: Attribute.Boolean;
    scale: Attribute.Boolean;
    constraint: Attribute.Enumeration<['None', 'Floor', 'Wall']>;
    assets: Attribute.Relation<
      'api::asset-interaction.asset-interaction',
      'manyToMany',
      'api::asset.asset'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::asset-interaction.asset-interaction',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::asset-interaction.asset-interaction',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiAzureCredentialAzureCredential
  extends Schema.CollectionType {
  collectionName: 'azure_credentials';
  info: {
    singularName: 'azure-credential';
    pluralName: 'azure-credentials';
    displayName: 'AzureCredential';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    ProjectName: Attribute.String;
    IoTHubConnectionString: Attribute.String;
    SignalRPath: Attribute.String;
    business: Attribute.Relation<
      'api::azure-credential.azure-credential',
      'oneToOne',
      'api::business.business'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::azure-credential.azure-credential',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::azure-credential.azure-credential',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiBusinessBusiness extends Schema.CollectionType {
  collectionName: 'businesses';
  info: {
    singularName: 'business';
    pluralName: 'businesses';
    displayName: 'Business';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Name: Attribute.String;
    businessId: Attribute.String & Attribute.Unique;
    Manager: Attribute.String;
    ManagerImage: Attribute.String;
    NumberOfPeople: Attribute.Integer;
    codeIntegrationHead: Attribute.Text;
    codeIntegrationBody: Attribute.Text;
    avatar: Attribute.Media;
    sketchfabCredentialCode: Attribute.String;
    position_in_presets: Attribute.Relation<
      'api::business.business',
      'oneToMany',
      'api::position-in-preset.position-in-preset'
    >;
    presets: Attribute.Relation<
      'api::business.business',
      'oneToMany',
      'api::preset.preset'
    >;
    azure_credential: Attribute.Relation<
      'api::business.business',
      'oneToOne',
      'api::azure-credential.azure-credential'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::business.business',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::business.business',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiCategoryCategory extends Schema.CollectionType {
  collectionName: 'categories';
  info: {
    singularName: 'category';
    pluralName: 'categories';
    displayName: 'Category';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    products: Attribute.Relation<
      'api::category.category',
      'oneToMany',
      'api::product.product'
    >;
    name: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::category.category',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiContentContent extends Schema.CollectionType {
  collectionName: 'contents';
  info: {
    singularName: 'content';
    pluralName: 'contents';
    displayName: 'HealthcareContent';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Content: Attribute.Text;
    ContentName: Attribute.String;
    ContentType: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::content.content',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::content.content',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiDigitalTwinFactoryMachineDigitalTwinFactoryMachine
  extends Schema.CollectionType {
  collectionName: 'digital_twin_factory_machines';
  info: {
    singularName: 'digital-twin-factory-machine';
    pluralName: 'digital-twin-factory-machines';
    displayName: 'DigitalTwinFactory/Machine';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    MachineId: Attribute.String;
    Status: Attribute.Boolean;
    Enable: Attribute.Boolean;
    asset: Attribute.Relation<
      'api::digital-twin-factory-machine.digital-twin-factory-machine',
      'oneToOne',
      'api::asset.asset'
    >;
    chartColumn: Attribute.Integer &
      Attribute.SetMinMax<
        {
          min: 2;
        },
        number
      > &
      Attribute.DefaultTo<3>;
    chartRow: Attribute.Integer &
      Attribute.SetMinMax<
        {
          min: 1;
        },
        number
      > &
      Attribute.DefaultTo<3>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::digital-twin-factory-machine.digital-twin-factory-machine',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::digital-twin-factory-machine.digital-twin-factory-machine',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiGroupContentGroupContent extends Schema.CollectionType {
  collectionName: 'group_contents';
  info: {
    singularName: 'group-content';
    pluralName: 'group-contents';
    displayName: 'HealthcareGroupContent';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Title: Attribute.String;
    contents: Attribute.Relation<
      'api::group-content.group-content',
      'oneToMany',
      'api::content.content'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::group-content.group-content',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::group-content.group-content',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiInteractionInteraction extends Schema.CollectionType {
  collectionName: 'interactions';
  info: {
    singularName: 'interaction';
    pluralName: 'interactions';
    displayName: 'Interaction';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    asset_interactions: Attribute.Relation<
      'api::interaction.interaction',
      'oneToMany',
      'api::asset-interaction.asset-interaction'
    >;
    part_interactions: Attribute.Relation<
      'api::interaction.interaction',
      'oneToMany',
      'api::part-interaction.part-interaction'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::interaction.interaction',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::interaction.interaction',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiManuFactoryManuFactory extends Schema.CollectionType {
  collectionName: 'manu_factories';
  info: {
    singularName: 'manu-factory';
    pluralName: 'manu-factories';
    displayName: 'ManuFactory';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    MachineId: Attribute.String;
    Time: Attribute.Time;
    Pressure: Attribute.Decimal;
    Voltage: Attribute.Decimal;
    Current: Attribute.Decimal;
    ProductionTime: Attribute.Decimal;
    Temperature: Attribute.Decimal;
    MachineName: Attribute.String;
    Status: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::manu-factory.manu-factory',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::manu-factory.manu-factory',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiOpenAiOpenAi extends Schema.CollectionType {
  collectionName: 'open_ais';
  info: {
    singularName: 'open-ai';
    pluralName: 'open-ais';
    displayName: 'OpenAI';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    StartAI: Attribute.Boolean;
    Label_ID: Attribute.Integer;
    Question: Attribute.Text;
    Answer: Attribute.Text;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::open-ai.open-ai',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::open-ai.open-ai',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPartPart extends Schema.CollectionType {
  collectionName: 'parts';
  info: {
    singularName: 'part';
    pluralName: 'parts';
    displayName: 'Part';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    asset: Attribute.Relation<
      'api::part.part',
      'manyToOne',
      'api::asset.asset'
    >;
    part_interactions: Attribute.Relation<
      'api::part.part',
      'oneToMany',
      'api::part-interaction.part-interaction'
    >;
    description: Attribute.RichText;
    cover: Attribute.Boolean & Attribute.DefaultTo<false>;
    displayname: Attribute.String;
    image: Attribute.Media;
    chartType: Attribute.Enumeration<
      [
        'none',
        'CircularProgress001',
        'CircularProgress003',
        'CircularProgress004',
        'Wavecircle1',
        'BarChart',
        'BarChartTwoColumn01',
        'BarChartTwoColumn02',
        'Dashboard003'
      ]
    > &
      Attribute.DefaultTo<'none'>;
    unit: Attribute.String;
    minValue: Attribute.Float;
    maxValue: Attribute.Float;
    sensorName: Attribute.String;
    chartSize: Attribute.Enumeration<['Large', 'Small']>;
    chartOrder: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<'api::part.part', 'oneToOne', 'admin::user'> &
      Attribute.Private;
    updatedBy: Attribute.Relation<'api::part.part', 'oneToOne', 'admin::user'> &
      Attribute.Private;
  };
}

export interface ApiPartInteractionPartInteraction
  extends Schema.CollectionType {
  collectionName: 'part_interactions';
  info: {
    singularName: 'part-interaction';
    pluralName: 'part-interactions';
    displayName: 'PartInteraction';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    name: Attribute.String;
    part: Attribute.Relation<
      'api::part-interaction.part-interaction',
      'manyToOne',
      'api::part.part'
    >;
    interaction: Attribute.Relation<
      'api::part-interaction.part-interaction',
      'manyToOne',
      'api::interaction.interaction'
    >;
    move: Attribute.Boolean;
    rotate: Attribute.Boolean;
    constraint: Attribute.Enumeration<['None', 'Floor', 'Wall']>;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::part-interaction.part-interaction',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::part-interaction.part-interaction',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPopupPopup extends Schema.CollectionType {
  collectionName: 'popups';
  info: {
    singularName: 'popup';
    pluralName: 'popups';
    displayName: 'HealthcarePopup';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    PopupName: Attribute.String;
    groups: Attribute.Relation<
      'api::popup.popup',
      'oneToMany',
      'api::group-content.group-content'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::popup.popup',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::popup.popup',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPositionInPresetPositionInPreset
  extends Schema.CollectionType {
  collectionName: 'position_in_presets';
  info: {
    singularName: 'position-in-preset';
    pluralName: 'position-in-presets';
    displayName: 'PositionInPreset';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    asset: Attribute.Relation<
      'api::position-in-preset.position-in-preset',
      'manyToOne',
      'api::asset.asset'
    >;
    positions: Attribute.JSON;
    rotations: Attribute.JSON;
    scales: Attribute.JSON;
    business: Attribute.Relation<
      'api::position-in-preset.position-in-preset',
      'manyToOne',
      'api::business.business'
    >;
    preset: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::position-in-preset.position-in-preset',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::position-in-preset.position-in-preset',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPresetPreset extends Schema.CollectionType {
  collectionName: 'presets';
  info: {
    singularName: 'preset';
    pluralName: 'presets';
    displayName: 'Preset';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    assets: Attribute.Relation<
      'api::preset.preset',
      'oneToMany',
      'api::asset.asset'
    >;
    positions: Attribute.JSON;
    rotations: Attribute.JSON;
    scales: Attribute.JSON;
    business: Attribute.Relation<
      'api::preset.preset',
      'manyToOne',
      'api::business.business'
    >;
    preset: Attribute.String;
    presetPosition: Attribute.JSON;
    presetRotation: Attribute.JSON;
    businessId: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::preset.preset',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::preset.preset',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiPresetNamePresetName extends Schema.CollectionType {
  collectionName: 'preset_names';
  info: {
    singularName: 'preset-name';
    pluralName: 'preset-names';
    displayName: 'PresetBackup';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    Object: Attribute.JSON;
    Key: Attribute.String;
    businessId: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::preset-name.preset-name',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::preset-name.preset-name',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiProductProduct extends Schema.CollectionType {
  collectionName: 'products';
  info: {
    singularName: 'product';
    pluralName: 'products';
    displayName: 'Product';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    title: Attribute.String;
    description: Attribute.Text;
    price: Attribute.Decimal;
    rating: Attribute.Decimal;
    thumbnail: Attribute.String;
    businessId: Attribute.String;
    productId: Attribute.String & Attribute.Unique;
    backup_assets: Attribute.Relation<
      'api::product.product',
      'oneToMany',
      'api::asset.asset'
    >;
    modelsNumber: Attribute.Integer;
    tryoutLink: Attribute.String;
    testImage: Attribute.Media;
    arViewer: Attribute.String;
    category: Attribute.Relation<
      'api::product.product',
      'manyToOne',
      'api::category.category'
    >;
    assets: Attribute.Relation<
      'api::product.product',
      'oneToMany',
      'api::asset.asset'
    >;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::product.product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::product.product',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiStoreOnlineDataStoreOnlineData
  extends Schema.CollectionType {
  collectionName: 'store_online_datas';
  info: {
    singularName: 'store-online-data';
    pluralName: 'store-online-datas';
    displayName: 'StoreOnlineData';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    OnlineVisitsLastMonth: Attribute.Integer;
    OnlineUniqueVisitorsLastMonth: Attribute.Integer;
    OnlinePagesPerVisit: Attribute.Float;
    OnlineVisitsIncreasePercents: Attribute.Float;
    ReferralVisits: Attribute.Integer;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::store-online-data.store-online-data',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::store-online-data.store-online-data',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiTriggerFromUnityTriggerFromUnity
  extends Schema.CollectionType {
  collectionName: 'triggers_from_unity';
  info: {
    singularName: 'trigger-from-unity';
    pluralName: 'triggers-from-unity';
    displayName: 'StoreTriggerFromUnity';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    StoreStartSimulate: Attribute.Boolean;
    ProductOnWhatShelvesList: Attribute.String;
    ProductsBonusList: Attribute.String;
    ProductsPenaltyList: Attribute.String;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::trigger-from-unity.trigger-from-unity',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::trigger-from-unity.trigger-from-unity',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

export interface ApiWindTurbineAlertTriggerWindTurbineAlertTrigger
  extends Schema.CollectionType {
  collectionName: 'wind_turbine_alert_triggers';
  info: {
    singularName: 'wind-turbine-alert-trigger';
    pluralName: 'wind-turbine-alert-triggers';
    displayName: 'WindTurbineAlertTrigger';
    description: '';
  };
  options: {
    draftAndPublish: true;
  };
  attributes: {
    isCancelAlert: Attribute.Boolean;
    createdAt: Attribute.DateTime;
    updatedAt: Attribute.DateTime;
    publishedAt: Attribute.DateTime;
    createdBy: Attribute.Relation<
      'api::wind-turbine-alert-trigger.wind-turbine-alert-trigger',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
    updatedBy: Attribute.Relation<
      'api::wind-turbine-alert-trigger.wind-turbine-alert-trigger',
      'oneToOne',
      'admin::user'
    > &
      Attribute.Private;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface ContentTypes {
      'admin::permission': AdminPermission;
      'admin::user': AdminUser;
      'admin::role': AdminRole;
      'admin::api-token': AdminApiToken;
      'admin::api-token-permission': AdminApiTokenPermission;
      'admin::transfer-token': AdminTransferToken;
      'admin::transfer-token-permission': AdminTransferTokenPermission;
      'plugin::upload.file': PluginUploadFile;
      'plugin::upload.folder': PluginUploadFolder;
      'plugin::content-releases.release': PluginContentReleasesRelease;
      'plugin::content-releases.release-action': PluginContentReleasesReleaseAction;
      'plugin::users-permissions.permission': PluginUsersPermissionsPermission;
      'plugin::users-permissions.role': PluginUsersPermissionsRole;
      'plugin::users-permissions.user': PluginUsersPermissionsUser;
      'plugin::i18n.locale': PluginI18NLocale;
      'api::asset.asset': ApiAssetAsset;
      'api::asset-interaction.asset-interaction': ApiAssetInteractionAssetInteraction;
      'api::azure-credential.azure-credential': ApiAzureCredentialAzureCredential;
      'api::business.business': ApiBusinessBusiness;
      'api::category.category': ApiCategoryCategory;
      'api::content.content': ApiContentContent;
      'api::digital-twin-factory-machine.digital-twin-factory-machine': ApiDigitalTwinFactoryMachineDigitalTwinFactoryMachine;
      'api::group-content.group-content': ApiGroupContentGroupContent;
      'api::interaction.interaction': ApiInteractionInteraction;
      'api::manu-factory.manu-factory': ApiManuFactoryManuFactory;
      'api::open-ai.open-ai': ApiOpenAiOpenAi;
      'api::part.part': ApiPartPart;
      'api::part-interaction.part-interaction': ApiPartInteractionPartInteraction;
      'api::popup.popup': ApiPopupPopup;
      'api::position-in-preset.position-in-preset': ApiPositionInPresetPositionInPreset;
      'api::preset.preset': ApiPresetPreset;
      'api::preset-name.preset-name': ApiPresetNamePresetName;
      'api::product.product': ApiProductProduct;
      'api::store-online-data.store-online-data': ApiStoreOnlineDataStoreOnlineData;
      'api::trigger-from-unity.trigger-from-unity': ApiTriggerFromUnityTriggerFromUnity;
      'api::wind-turbine-alert-trigger.wind-turbine-alert-trigger': ApiWindTurbineAlertTriggerWindTurbineAlertTrigger;
    }
  }
}
