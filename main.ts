import { CompositeValidator } from './validation/CompositeValidator';
import { articleValidator } from './validation/articleValidator';
import { productValidator } from './validation/productValidator';
import { article, product } from './examples/data';
import { articleAccessControl } from './examples/accessControl';
import { articleOps } from './examples/operations';
import { Versioned } from './versioning/types';
import { checkAccess } from './access/checkAccess';
import { Article } from './types/content';

const compositeArticleValidator = new CompositeValidator<Article>();
compositeArticleValidator.addValidator(articleValidator);

// Тестування валідації
console.log('Article Validation:', articleValidator.validate(article));
console.log('Product Validation:', productValidator.validate(product));
console.log(
    'Composite Validation (Article):',
    compositeArticleValidator.validate(article)
);

// Тестування операцій з контентом
console.log('Create Article:', articleOps.create(article));
console.log('Read Article:', articleOps.read('1'));
console.log('Update Article:', articleOps.update('1', { title: 'Updated Article' }));
console.log('Delete Article:', articleOps.delete('1'));

// Тестування версіонування
const versionedArticle: Versioned<Article> = {
    ...article,
    version: 1,
    previousVersions: [],
};
console.log('Versioned Article:', versionedArticle);

// Тестування прав доступу
console.log('Admin can create article:', 
    checkAccess(articleAccessControl, 'admin', 'create'));
console.log('Editor can delete article:', 
    checkAccess(articleAccessControl, 'editor', 'delete'));
console.log('Viewer can read article:', 
    checkAccess(articleAccessControl, 'viewer', 'read'));
console.log('Viewer can create article:', 
    checkAccess(articleAccessControl, 'viewer', 'create'));