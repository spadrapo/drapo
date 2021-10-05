﻿using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace Sysphera.Middleware.Drapo.Pipe
{
    public interface IDrapoPlumber
    {
        Task<bool> Send(DrapoPipeMessage message, DrapoPipeAudienceType recipient = DrapoPipeAudienceType.Others);
        Task<long> Count();
        Task<bool> Identify(long identity);
        Task<List<DrapoConnection>> GetConnections();
        bool CheckConnections();
    }
}
