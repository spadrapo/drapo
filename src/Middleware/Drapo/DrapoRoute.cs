using System;
using System.Collections.Generic;
using System.Text;

namespace Sysphera.Middleware.Drapo
{
    public class DrapoRoute
    {
        public string Uri { set; get; }
        public string Expression { set; get; }
        public string BeforeLoadExpression { set; get; }

        public string AfterLoadExpression { set; get; }
    }
}
